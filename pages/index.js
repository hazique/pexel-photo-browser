import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ImageBrowser from '../components/imageBrowser';
import { useEffect, useState } from 'react';

import Navbar from '../components/navBar';
import Search from '../components/search';

export default function App() {

  const [searchString, setSearchString] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    const reloadInterval = window.setInterval(()=>{
      console.log("reloading page");
      router.reload();
    }, 1000 * 60 * 2);

  return ()=> window.clearInterval(reloadInterval);
  }, []);

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