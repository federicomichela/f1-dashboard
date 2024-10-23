import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Footer} from "../../components/Footer";
import "./LandingPage.scss"

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <main className="lp-main">
                <img
                    className="dark:invert"
                    src="/logo192.png"
                    alt="Formula 1 logo"
                />

                <div className="flex justify-center align-center">
                    <button className="btn-default" onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </button>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default LandingPage;