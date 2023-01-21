const express = require('express');
const next = require('next');

const {createClient} = require('pexels');
const pexelsClient = createClient('563492ad6f917000010000012a940a3e6872471ab80533d31217887f');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/api/photos/curated/:pageNum', async (req, res) => {
      
      const curatedPics = await pexelsClient.photos.curated({per_page: 10, page: req.params.pageNum});
      return res.send(curatedPics);
    });

    server.get('/api/photos/search/:searchTerm/:pageNum', async (req, res) => {
      const query = req.params.searchTerm;
      const curatedPics = await pexelsClient.photos.search({query, per_page: 10, page: req.params.pageNum});
      return res.send(curatedPics);
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })