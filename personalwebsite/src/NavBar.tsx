import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    const location = useLocation();

    const links = [
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "/Portfolio" },
        { name: "Contact", href: "/Contact" }
    ];

    return (
        <>
            <nav className="topnav">
                <p className="topnavName">Dylan Yarbrough</p>
                <ul>
                    {links.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <li><Link to={link.href} className={isActive ? "active" : ""}> {link.name} </Link></li>
                        );
                    })}
                    
                </ul>
            </nav>
        </>
    )
};

export default NavBar