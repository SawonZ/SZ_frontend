import React from 'react';
import { lnbFigure, lnbHeading, lnbListTab, lnbProfileStyle, lnbStyle } from '../styles/commonTailwind';
import profileImg from '../../assets/images/profile_test.png';
import lnbIco1 from '../../assets/images/lnb_ico1.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/useUserStore';

const Lnb = () => {
    const {user} = useAuth();

    return (
        <div className={lnbStyle}>
            <div className={lnbProfileStyle}>
                <figure className={lnbFigure}>
                    <img src={profileImg} alt="직원 프로필 사진" className='w-full h-full'/>
                </figure>
                <p className='text-[#5E6778]'>{user?.userName} <span className='text-[13px] text-[#9CA3AF]'>{user?.role === "ROLE_ADMIN" ? "관리자" : "사원"}</span></p>
            </div>

            <div className='mb-[24px]'>
                <p className={lnbHeading}>출퇴근 관리</p>
                <ul>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" />
                            출퇴근 기록 조회
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Lnb;