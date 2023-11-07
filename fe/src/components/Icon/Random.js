import React from 'react';

const Icon = [
    <i className="fonticon-calendar fs-2"></i>,
    <i className="fonticon-like-1 fs-2"></i>,
    <i className="fonticon-app-store fs-2"></i>,
    <i className="fonticon-line-chart fs-2"></i>,
    <i className="fonticon-insurance fs-2"></i>,
    <i className="fonticon-email fs-2"></i>,
    <i className="fonticon-hourglass fs-2"></i>,
    <i className="fonticon-content-marketing fs-2"></i>,
    <i className="fa-brands fa-youtube fs-2"></i>,
    <i className="fa-brands fa-google fs-2"></i>,
    <i className="fa-brands fa-facebook fs-2"></i>,
    <i className="fa-brands fa-weibo fs-2"></i>,
    <i className="fa-brands fa-whatsapp fs-2"></i>,
    <i className="fa-brands fa-github fs-2"></i>,
    <i className="fa-brands fa-figma fs-2"></i>,
    <i className="fa-brands fa-android fs-2"></i>,
    <i className="fa-brands fa-pinterest fs-2"></i>,
    <i className="fa-brands fa-paypal fs-2"></i>,
    <i className="fa-brands fa-instagram fs-2"></i>,
    <i className="fa-brands fa-kickstarter fs-2"></i>,
    <i className="fa-brands fa-apple fs-2"></i>,
    <i className="fa-brands fa-tumblr fs-2"></i>,
    <i className="fa-brands fa-playstation fs-2"></i>,
    <i className="fa-brands fa-spotify fs-2"></i>,
    <i className="fa-brands fa-stack-overflow fs-2"></i>,
]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(Icon);

export default Icon