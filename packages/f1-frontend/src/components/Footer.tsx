import React from 'react';
import {Link} from "react-router-dom";

export function Footer() {
    return (
        <footer>
            <Link
                to="https://github.com/federicomichela/f1-dashboard"
                target="_blank"
                rel="noopener noreferrer"
            >
                Github
            </Link>
            <Link
                to="https://www.linkedin.com/in/michela-federico/"
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </Link>
            <Link
                to="https://www.instagram.com/michela.zakir/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Instagram
            </Link>
        </footer>
    )
}