import React from "react";
import { useState } from "react";

import Search from "./search";

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="navbar navbar-expand-lg rounded">
            <div className="w-100">
                <div className="navbar-brand text-info font-weight-bolder d-inline">
                    <div className="mx-3 mt-3 d-inline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera2" viewBox="0 0 16 16">
                            <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4z" />
                            <path d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.972 5.972 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1zM2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0z" />
                        </svg>
                    </div>
                    <div className="d-inline">
                        <span className="navbar-brand col mt-1">Pexels Photo Browser</span>
                    </div>

                </div>

                <hr className="mt-2 mb-4" />

                {/* below commented code helps to move the search bar into the navbar */}
                {/* <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavBar" aria-controls="topNavBar" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                {/* <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse mt-2`} id="topNavBar">
                    
                </div> */}
            </div>
        </nav>
    );
}
export default Navbar;