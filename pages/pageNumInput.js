import { useEffect, useState } from "react";

export default function PageNumInput({ pageNum, totalPages, setNewPage }) {

    return (
        <div className="col-xs-1">
            <input className="form-control w-50 mx-2 d-inline" id="pageNum" min="1" max={totalPages} type="number" value={pageNum} onChange={(e) => setNewPage(e.target.value)}/>
            <span className="d-inline-block mx-auto">of {totalPages}</span>
        </div>
    );
}