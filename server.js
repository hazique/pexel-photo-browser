const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;

const { createClient } = require('pexels');

app.prepare()
  .then(() => {
    const server = express();
    const pexelsClient = createClient(process.env.PEXELS_API_KEY);
    console.log("API KEY: ", process.env.PEXELS_API_KEY ? true : false);

    server.get('/api/photos/curated/:pageNum', async (req, res) => {

      const curatedPics = await pexelsClient.photos.curated({ per_page: 10, page: req.params.pageNum });
      return res.send(curatedPics);
    });

    server.get('/api/photos/search/:searchTerm/:pageNum', async (req, res) => {
      const query = req.params.searchTerm;
      const curatedPics = await pexelsClient.photos.search({ query, per_page: 10, page: req.params.pageNum });
      return res.send(curatedPics);
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })