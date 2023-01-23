import { useEffect, useState } from "react";
import usePrevious from "../hooks/usePrevious";

import Image from "../components/image";
import PageNumInput from "../components/pageNumInput";

import { ImageList, ImageListItem, ImageListItemBar, Link } from "@mui/material";


export default function ImageBrowser({ searchString }) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [curPage, setCurPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const prevSearchString = usePrevious(searchString);
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
        debugger;
        console.log("Effect 1 | Previous search String: ", prevSearchString);

        if (!searchString)
            return;

        if (searchString === '') {
            fetchCurated();
            return;
        }

        fetchSearchResults(searchString);

    }, []);

    useEffect(() => {
        debugger;
        console.log("Effect 2");
        if (searchString === '' || searchString === undefined) {
            fetchCurated();
        }

        if (searchString && searchString !== '' && searchString.length > 0) {
            console.log("inside savedSearchString Effect");
            fetchSearchResults(searchString);
        }
    }, [searchString]);

    // Run effects on data load
    useEffect(() => {
        debugger;
        console.log("Effect 3: ", data);
        if (data && data.photos) {
            setIsLoading(false);
            // setCurPage(data.page);
            setTotalResults(data.total_results);
        }
    }, [data]);

    useEffect(() => {
        debugger;
        console.log("Effect 4 | New page selected: ", curPage);
        if (curPage === "")
            return;

        let pageNum = null;
        try {
            pageNum = parseInt(curPage);
        } catch (error) {
            pageNum = 1;
        }

        if (searchString === '' || searchString === null) {
            fetchCurated(curPage);
        }
        else {
            fetchSearchResults(searchString, curPage);
        }

    }, [curPage]);


    useEffect(() => {
        debugger;
        console.log("Effect 5");
        const pages = Math.floor(totalResults / resultsPerPage);
        setTotalPages(pages);
    }, [totalResults])


    return (
        <div>
            <div className="container d-flex flex-column">
                <div className="row text-center text-lg-start">
                    {isLoading ?
                        <Image src="https://source.unsplash.com/2ShvY8Lf6l0/800x599" />
                        :                        
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {data.photos && data.photos.map((photo) => (
                                <ImageListItem key={photo.id}>
                                    <img
                                        src={photo.src.original}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar position="bottom" title={<Link color="inherit" href={photo.photographer_url} target="_blank">{photo.photographer}</Link>} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    }

                </div>

                {
                    totalResults > 10 && totalPages > 1 &&
                    (
                        <div className="pagination mx-auto mb-4">
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