import { useContext, useEffect } from "react";
import { SearchStringContext } from "./";

export default function Search({ }) {

    const { searchString, setSearchString } = useContext(SearchStringContext);

    const onClickHandler = (e) => {
        if (e.target.id === 'clearText'){
            document.getElementById('searchBar').value = '';
            localStorage.setItem('searchString', document.getElementById('searchBar').value);
            setSearchString(localStorage.getItem('searchString'));
        }

        if (e.target.id === 'search'){
            localStorage.setItem('searchString', document.getElementById('searchBar').value);
            setSearchString(localStorage.getItem('searchString'));
        }
    };

    // useEffect(()=>{

    // }, [searchString]);

    return (
        <div className="input-group mb-4 mx-auto w-75">
            <input type="text" id="searchBar" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" defaultValue={searchString}/>
            {   searchString !== "" &&
                (
                    <span className="input-group-text input-group-append">
                        <button type="button" id="clearText" onClick={onClickHandler} className="btn-close input-group-append" aria-label="Close"></button>
                    </span>
                )}
            <button id="search" className="input-group-append input-group-text" onClick={onClickHandler} >Search</button>
        </div>
    );
}