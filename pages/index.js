import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageBrowser from './imageBrowser';
import { useState } from 'react';

import Navbar from './navBar';
import Search from './search';

export default function App() {

  const [searchString, setSearchString] = useState(null);

  return (
    <div>
      <Head>
        <title>Pexels Photo Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className="container">
          <Navbar />
          <Search searchString={searchString} setSearchString={setSearchString}/>
          <ImageBrowser searchString={searchString} />

        </main>
    </div>

  )
}