import React from 'react';
import { header, landingHeaderLink } from '../styles/headerTailwind';
import { Link, useNavigate } from 'react-router-dom';
import landingLogo from '../../assets/images/landing_logo.svg';
import { useAuth } from '../../store/useUserStore';
import useModalShow from '../hooks/useModalShow';
import Modal from './Modal';

const Header = () => {
    const { isLogged, logout } = useAuth();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const navigate = useNavigate();
    
    const handleClickLogout = (e) => {
        e.preventDefault();        
        setModalText('로그아웃이 완료되었습니다.');
        setModalShow(true);
        return;
    };

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
            {   
                isLogged && 
                <button 
                    className={landingHeaderLink}
                    onClick={handleClickLogout}
                >
                    로그아웃
                </button>
            }

            {
                modalShow && 
                <Modal 
                    modalShowReset={() => setModalShow(false)}
                    modalText={modalText}
                    modalTextClear={() => setModalText('')}
                    onClick={() => {
                        logout()
                        navigate('/')
                    }}
                />
            }
        </header>
    );
};

export default Header;