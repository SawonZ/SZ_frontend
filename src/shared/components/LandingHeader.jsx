import React from 'react';
import { landingHeader, /* landingHeaderLink, */ landingHeaderNav } from '../styles/landingHeaderTailwind';
import landingLogo from '../../assets/images/landing_logo.svg';
import { inner } from '../styles/commonTailwind';
import { Link } from 'react-router-dom';


const LandingHeader = () => {
    return (
        <header className={landingHeader}>
            <div className={inner}>
                <nav className={landingHeaderNav}>
                    <h1>
                        <Link to={'/'} >
                            <img 
                                src={landingLogo}
                                alt='사원즈 로고'
                            />
                        </Link>
                    </h1>
                    {/* <div className='flex gap-[20px]'>
                        <Link to={'/login'} 
                        className={landingHeaderLink}>로그인</Link>
                        <Link to={'/policy'} className={landingHeaderLink}>회원가입</Link>
                    </div> */}
                </nav>
            </div>
        </header>
    );
};

export default LandingHeader;