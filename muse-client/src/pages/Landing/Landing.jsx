import React from 'react'
import logo from '../../assets/icons/logo-no-bg-fv.svg';
import logoText from '../../assets/icons/muse-logo-text.svg';

import './Landing.scss';


export default function Landing() {
    return (
        <div className="landing">
            <img src={logo} alt="Spotify logo" className='landing__logo' />
            <img src={logoText} alt="Spotify logo" className='landing__logo--bottom' />
            <div className="landing__buttons">
                <a href="http://localhost:8080/login" className="landing__link">
                    <div className="landing__btn primary-btn">
                        LOG IN
                    </div>
                </a>
                <a href="https://www.spotify.com/signup" className="landing__link">
                    <div className="landing__btn primary-btn">
                        SIGN UP
                    </div>
                </a>
            </div>
            <div href="https://www.spotify.com/" className="landing__link">
                <p className="landing__text">Generated with
                    <a href="https://www.spotify.com/" className="landing__link--redirect"> Spotify </a>

                </p>
            </div >
        </div >
    )

}
