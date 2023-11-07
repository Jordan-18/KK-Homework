import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RouteModule from '../Routes/Routes.js';

function Header(){
    const [selectedRoute, setSelectedRoute] = useState(null);

    const handleRouteSelect = (route) => {
        setSelectedRoute(route);
    };

    return(
        <div id="kt_app_header" className="app-header" data-kt-sticky="true" data-kt-sticky-activate-="true" data-kt-sticky-name="app-header-sticky" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
            <div className="app-container container-xxl d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
                <div className="app-header-wrapper d-flex flex-grow-1 align-items-stretch justify-content-between" id="kt_app_header_wrapper">
                    <div className="app-header-menu app-header-mobile-drawer align-items-start align-items-lg-center w-100" data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
                        <div className="menu menu-rounded menu-column menu-lg-row menu-active-bg menu-state-primary menu-title-gray-700 menu-arrow-gray-400 menu-bullet-gray-400 my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="#kt_header_menu" data-kt-menu="true">
                            {RouteModule.map((pageData, index) => ( 
                                <div 
                                    key={index} 
                                    data-kt-menu-trigger="{default: 'click', lg: 'hover'}" 
                                    data-kt-menu-placement="bottom-start" 
                                    className="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2"
                                >
                                    <Link
                                        to={`/${pageData.to.toLowerCase()}${pageData.params ? `?model=${pageData?.params?.toLowerCase()}` : ''}`} 
                                        onClick={() => handleRouteSelect(pageData.to)}
                                    >
                                        <span className="menu-link">
                                            <span className="menu-title">{pageData.page.toUpperCase()}</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="btn btn-icon btn-color-gray-600 btn-active-color-primary ms-n3 me-2 d-flex d-lg-none" id="kt_app_sidebar_toggle">
                            <span className="svg-icon svg-icon-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                                    <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
                                </svg>
                            </span>
                        </div>
                        <a href="../../demo23/dist/index.html" className="d-flex d-lg-none">
                            <img alt="Logo" src="assets/media/logos/demo23.svg" className="h-20px theme-light-show" />
                            <img alt="Logo" src="assets/media/logos/demo23-dark.svg" className="h-20px theme-dark-show" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header