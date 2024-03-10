import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Button from './Button';

function Header() {
    return (
        <div className="container">
            <div className="logo">
                <h1 className="main-header">StudioSift</h1>
                <h3 className="sub-header">Explore your favorite studios with ease</h3>
            </div>
            <div className="nav-container">
                <Link to='/'>
                    <Button text="Home" link="/"/>
                </Link>
                <Link to="/news">
                    <Button text="News" link="/news" />
                </Link>
                <Link to="/about">
                    <Button text="About" link="/about" />
                </Link>
                <Link to="/search">
                    <Button text="Studio Search" link="/search" />
                </Link>
                <Link to="/statistics">
                    <Button text="Statistics" link="/statistics" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
