import React from 'react';
import { header } from '../styles/headerTailwind';
import { Link } from 'react-router-dom';
import landingLogo from '../../assets/images/landing_logo.svg';

const Header = () => {
    return (
        <header className={header}>
            <h1>
                <Link to={'/main'} >
                    <img 
                        src={landingLogo}
                        alt='사원즈 로고'
                    />
                </Link>
            </h1>
        </header>
    );
};

export default Header;