

export default function Image({ src, loaded }) {


    return (
        <div className="col-lg-3 col-md-4 col-6">
            <a href="#" className="d-block mb-4 h-100">
                <img className="img-fluid img-thumbnail" src={src} alt="Image" />
            </a>
        </div>
    );
}