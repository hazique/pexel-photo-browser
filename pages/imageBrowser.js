import { useEffect, useState } from "react";

import Image from "./image";


export default function ImageBrowser(props) {

    // let [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("/api/photos/curated");
            const json = await resp.json();
            setData(json);
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.photos)
        if (data.length !== 0) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div>

            <div className="input-group mb-3 w-50 mx-auto">
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
            </div>

            <div className="container">

                <h1 className="fw-light text-center text-lg-start mt-4 mb-0">Thumbnail Gallery</h1>

                <hr className="mt-2 mb-5" />

                <div className="row text-center text-lg-start">
                    {isLoading ?
                        <Image src="https://source.unsplash.com/2ShvY8Lf6l0/800x599" />
                        :
                        data.photos.map(photo => <Image src={photo.src.medium} />)
                    }
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

    )

}