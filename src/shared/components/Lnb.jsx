import React, { use, useEffect } from 'react';
import '../../shared/styles/animation.css';
import { lnbFigure, lnbHeading, lnbProfileStyle, lnbStyle, newBadge } from '../styles/commonTailwind';
import profileImg from '../../assets/images/profile_test.png';
import lnbIco1 from '../../assets/images/lnb_ico1.png';
import lnbIco1On from '../../assets/images/lnb_ico1_on.png';
import lnbIco2 from '../../assets/images/lnb_ico2.png';
import lnbIco3 from '../../assets/images/lnb_ico3.png';
import lnbIco4 from '../../assets/images/lnb_ico4.png';
import lnbIco5 from '../../assets/images/lnb_ico5.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, useUserInquiryPortion } from '../../store/useUserStore';

const Lnb = () => {
    const {user} = useAuth();
    const {users} = useUserInquiryPortion();
    const location = useLocation();

    return (
        <div className={lnbStyle}>
            <div className={lnbProfileStyle}>
                <figure className={lnbFigure}>
                    <img src={profileImg} alt="직원 프로필 사진" className='w-full h-full'/>
                </figure>
                <p className='text-[#5E6778]'>{user?.userName} <span className='text-[13px] text-[#9CA3AF]'>{user?.role === "ROLE_ADMIN" ? "관리자" : users?.positionTitle}</span></p>
            </div>

            <div className='mb-[24px]'>
                <p className={lnbHeading}>출퇴근 관리</p>
                <ul>
                    <li>
                        <Link to={''} className='lnb-lists-tab'>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className='lnb-ico' />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className='lnb-ico-on' />
                            출퇴근 기록 조회
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='mb-[24px]'>
                <p className={lnbHeading}>근태 관리</p>
                <ul>
                    <li>
                        <Link to={''} className='lnb-lists-tab'>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className='lnb-ico' />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className='lnb-ico-on' />
                            휴가 일정 관리
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className='lnb-lists-tab'>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className='lnb-ico' />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className='lnb-ico-on' />
                            연차 신청
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className='lnb-lists-tab'>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className='lnb-ico' />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className='lnb-ico-on' />
                            연차 일정 확인
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='mb-[24px]'>
                <p className={lnbHeading}>직원 관리</p>
                <ul>
                    <li>
                        <Link 
                            to={user?.role === "ROLE_ADMIN" ? '/user-lists' : '/user-lists-portion'} 
                            className={location.pathname === '/user-lists' || location.pathname === '/user-lists-portion'  ? 'lnb-lists-tab on' : 'lnb-lists-tab'}
                        >
                            <img src={lnbIco1} alt="직원 정보 수정 아이콘" className='lnb-ico'/>
                            <img src={lnbIco1On} alt="직원 정보 수정 아이콘" className='lnb-ico-on' />
                            직원 조회
                        </Link>
                    </li>
                    {
                        user?.role !== "ROLE_ADMIN" ? null
                        : 
                        <li>
                            <Link to={''} className='lnb-lists-tab'>
                                <img src={lnbIco2} alt="직원 정보 수정 아이콘" className='lnb-ico' />
                                <img src={lnbIco1On} alt="직원 정보 수정 아이콘" className='lnb-ico-on' />
                                직원 정보 수정
                            </Link>
                        </li>
                    }
                    {
                        user?.role !== "ROLE_ADMIN" ? null
                        : 
                        <li>
                            <Link to={''} className='lnb-lists-tab'>
                                <img src={lnbIco3} alt="신규 가입승인 아이콘" className='lnb-ico' />
                                <img src={lnbIco1On} alt="신규 가입승인 아이콘" className='lnb-ico-on' />
                                신규 가입승인
                                <span className={newBadge}>NEW</span>
                            </Link>
                        </li>
                    }
                    {
                        user?.role !== "ROLE_ADMIN" ? null
                        : 
                        <li>
                            <Link to={''} className='lnb-lists-tab'>
                                <img src={lnbIco3} alt="퇴사 처리 아이콘" className='lnb-ico' />
                                <img src={lnbIco1On} alt="퇴사 처리 아이콘" className='lnb-ico-on' />
                                퇴사 처리
                            </Link>
                        </li>
                    }
                </ul>
            </div>

            <div>
                <p className={lnbHeading}>게시판</p>
                <ul>
                    <li>
                        <Link to={''} className='lnb-lists-tab'>
                            <img src={lnbIco4} alt="공지사항 아이콘" className='lnb-ico' />
                            <img src={lnbIco1On} alt="공지사항 아이콘" className='lnb-ico-on' />
                            공지사항
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className='lnb-lists-tab'>
                            <img src={lnbIco5} alt="고객문의 관리 아이콘" className='lnb-ico' />
                            <img src={lnbIco1On} alt="고객문의 관리 아이콘" className='lnb-ico-on' />
                            고객문의 관리
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Lnb;