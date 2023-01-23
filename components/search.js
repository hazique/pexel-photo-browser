import { useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export default function Search({searchString, setSearchString }) {

    const [savedSearchString, setSavedSearchString] = useLocalStorage('savedSearchString', "");

    const onClickSearch = e => {
        setSavedSearchString(document.getElementById('searchBar').value);
    };
    
    const onClickClear = e => {
        document.getElementById('searchBar').value = null;
        setSavedSearchString('');
    };

    useEffect(()=>{
        if (savedSearchString !== '')
            setSearchString(savedSearchString);
            
    }, []);

    useEffect(()=>{
        setSearchString(savedSearchString);
    }, [savedSearchString]);

    return (
        <div className="input-group mb-4 mx-auto w-75">
            <input type="text" id="searchBar" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" defaultValue={searchString}/>
            {   searchString &&
                (
                    <span className="input-group-text input-group-append">
                        <button type="button" id="clearText" onClick={onClickClear} className="btn-close input-group-append" aria-label="Close"></button>
                    </span>
                )}
            <button id="search" className="input-group-append input-group-text" onClick={onClickSearch} >Search</button>
        </div>
    );
}