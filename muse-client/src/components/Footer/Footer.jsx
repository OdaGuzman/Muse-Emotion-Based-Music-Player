import React from 'react';
import './Footer.scss';
import LinkedIn from '../../assets/socials/icons8-linkedin-64.svg';
import GitHub from '../../assets/socials/icons8-github-64.svg';
import LogOut from '../../assets/socials/icons8-logout-64.png';

function Footer() {


  return (
    <footer className='footer'>
      <div className="footer__bottom">
        <div className="footer__socials">
          <a href="https://www.linkedin.com/in/oda-guzman/">
            <img src={LinkedIn} alt="linkedin" className="footer__social" />
          </a>
          <a href="https://github.com/OdaCommits">
            <img src={GitHub} alt="github" className="footer__social" />
          </a>
          <a href="https://www.odaguz.dev">
            <img src={LogOut} alt="logout" className="footer__social" />
          </a>
        </div>
      </div>
    </footer >
  );
}

export default Footer;