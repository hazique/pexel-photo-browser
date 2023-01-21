import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageBrowser from './imageBrowser';
import { createContext, useEffect, useState } from 'react';
import Navbar from './navBar';
import Search from './search';

export const SearchStringContext = createContext(null);

export default function App() {

  const [searchString, setSearchString] = useState('');

  useEffect(()=>{
    setSearchString(localStorage.getItem('searchString') || '');
  }, []);

  return (
    <div>
      <Head>
        <title>Pexels Photo Browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchStringContext.Provider value={{ searchString, setSearchString }} >
        <main className="container">
          <Navbar />
          <Search />
          <ImageBrowser />

        </main>
      </SearchStringContext.Provider>
    </div>

  )
}