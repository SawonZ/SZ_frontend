import React from 'react';
import { lnbFigure, lnbHeading, lnbIco, lnbIcoOn, lnbListTab, lnbProfileStyle, lnbStyle, newBadge } from '../styles/commonTailwind';
import profileImg from '../../assets/images/profile_test.png';
import lnbIco1 from '../../assets/images/lnb_ico1.png';
import lnbIco1On from '../../assets/images/lnb_ico1_on.png';
import lnbIco2 from '../../assets/images/lnb_ico2.png';
import lnbIco3 from '../../assets/images/lnb_ico3.png';
import lnbIco4 from '../../assets/images/lnb_ico4.png';
import lnbIco5 from '../../assets/images/lnb_ico5.png';
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
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className={lnbIcoOn} />
                            출퇴근 기록 조회
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='mb-[24px]'>
                <p className={lnbHeading}>근태 관리</p>
                <ul>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className={lnbIcoOn} />
                            휴가 일정 관리
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='mb-[24px]'>
                <p className={lnbHeading}>직원 관리</p>
                <ul>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco1} alt="출퇴근 기록 조회 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="출퇴근 기록 조회 아이콘" className={lnbIcoOn} />
                            직원 조회
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco2} alt="직원 정보 수정 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="직원 정보 수정 아이콘" className={lnbIcoOn} />
                            직원 정보 수정
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco3} alt="신규 가입승인 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="신규 가입승인 아이콘" className={lnbIcoOn} />
                            신규 가입승인
                            <span className={newBadge}>NEW</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco3} alt="퇴사 처리 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="퇴사 처리 아이콘" className={lnbIcoOn} />
                            퇴사 처리
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <p className={lnbHeading}>게시판</p>
                <ul>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco4} alt="공지사항 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="공지사항 아이콘" className={lnbIcoOn} />
                            공지사항
                        </Link>
                    </li>
                    <li>
                        <Link to={''} className={lnbListTab}>
                            <img src={lnbIco5} alt="고객문의 관리 아이콘" className={lnbIco} />
                            <img src={lnbIco1On} alt="고객문의 관리 아이콘" className={lnbIcoOn} />
                            고객문의 관리
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Lnb;