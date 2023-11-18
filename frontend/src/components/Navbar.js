import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact activeClassName="active">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/income-expense" activeClassName="active">Income/expense</NavLink>
                </li>
                <li>
                    <NavLink to="/category" activeClassName="active">Categories</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
