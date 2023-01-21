import { useContext, useEffect, useState } from "react";
import { SearchStringContext } from "./";

import Image from "./image";
import PageNumInput from "./pageNumInput";


export default function ImageBrowser(props) {

    const { searchString, setSearchString } = useContext(SearchStringContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [curPage, setCurPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = (e) => {

        if (e.target.innerText === "»")
            setCurPage(curPage + 1);

        else setCurPage(curPage - 1);
    }

    const fetchCurated = async (pageNum = 1) => {
        try {
            const resp = await fetch(`/api/photos/curated/${pageNum}`);
            const json = await resp.json();
            setData(json);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSearchResults = async (searchTerm, pageNum = 1) => {
        try {
            const resp = await fetch(`/api/photos/search/${searchTerm}/${pageNum}`);
            const json = await resp.json();
            setData(json);
        } catch (error) {
            console.log(error);
        }
    };

    // cDM - fetch data on component load
    useEffect(() => {
        console.log("Effect 1");
        if (searchString === '') {
            fetchCurated();
            return;
        }
        else {
            console.log(searchString)
            // fetchSearchResults(searchString);
            setSearchString(searchString + ' ');
        }
    }, []);

    // cDU - fetch data on search string modification
    useEffect(() => {
        console.log("Effect 2");
        if (searchString !== '') {
            console.log("inside searchString Effect");
            fetchSearchResults(searchString);
            // setCurPage(1);
        }

        if (searchString === '') {
            // setCurPage(1);
            fetchCurated();
        }

    }, [searchString]);

    // Run effects on data load
    useEffect(() => {
        console.log("Effect 3: ", data);
        if (data && data.photos) {
            setIsLoading(false);
            // setCurPage(data.page);
            setTotalResults(data.total_results);
        }
    }, [data]);

    useEffect(() => {
        console.log("Effect 4");
        const pages = Math.floor(totalResults / resultsPerPage);
        setTotalPages(pages);
    }, [totalResults])

    useEffect(() => {
        console.log("Effect 4");
        console.log("New page selected: ", curPage);
        if (curPage === "")
            return;

        let pageNum = null;
        try {
            pageNum = parseInt(curPage);
        } catch (error) {
            pageNum = 1;
        }

        if (searchString !== '') {
            fetchSearchResults(searchString, curPage);
            return;
        }
        else fetchCurated(curPage);

    }, [curPage]);

    return (
        <div>
            <div className="container">
                <div className="row text-center text-lg-start">
                    {isLoading ?
                        <Image src="https://source.unsplash.com/2ShvY8Lf6l0/800x599" />
                        :
                        data.photos.map(photo => <Image key={photo.id} data={photo} />)
                    }
                </div>

                {
                    totalResults > 10 && totalPages > 1 &&
                    (
                        <div className="pagination w-25 mx-auto mb-4">
                            <button className={`page-link page-item ${curPage == 1 ? "disabled" : ""}`} disabled={curPage === 1} onClick={navigate} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                            <PageNumInput pageNum={curPage} totalPages={totalPages} setNewPage={setCurPage} />

                            <button className={`page-link page-item ${curPage == totalPages ? "disabled" : ""}`} disabled={curPage === totalPages} onClick={navigate} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>

    )

}