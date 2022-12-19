import "./Header.scss";
import { NavLink, useLocation } from "react-router-dom";
import logoName from '../../assets/icons/muse-logo-text-plain.svg'
import logo from '../../assets/icons/logo-no-bg-fv.svg'
import logoutIcon from '../../assets/icons/right-from-bracket-solid.svg';
import { logout } from '../../spotify'

function Header({ token }) {

    const location = useLocation();

    return (
        <header className="header">
            <NavLink to={"/playlist"}>
                <div className="header__tooltip">
                    <img src={logo} alt="Muse logo" className="header__logo-img"></img>
                    <span className="header__tooltiptext">Playlist Generator</span>
                </div>

            </NavLink>
            <NavLink to="/">
                <div className="header__tooltip">
                    <img src={logoName} alt="Muse logo" className="header__logo-img--desktop"></img>
                    <span className="header__tooltiptext--center">Top Songs Global</span>
                </div>
            </NavLink>
            <div className={`header__links`}>
                <NavLink to='/playlist' className={`header__link ${(location.pathname === '/playlist' ? "header__link--active" : "")}`}>
                    Playlist
                </NavLink>
                <NavLink to='/about' className={`header__link ${(location.pathname === '/about' ? "header__link--active" : "")}`}>
                    About
                </NavLink>
                <NavLink to='/me' className={`header__link ${(location.pathname === '/me' ? "header__link--active" : "")}`}>
                    Profile
                </NavLink>
                <a href="/" className={"header__link header__btn"} onClick={logout}>
                    <span className="header__logout">Logout</span>
                    <span className="header__logout--mobile"><img src={logoutIcon} alt="logout" className="header__icon header_logout--mobile" /></span>
                </a>

            </div>
        </header>
    );
}

export default Header;
