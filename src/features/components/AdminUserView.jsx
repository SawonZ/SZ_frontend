import React, { useEffect, useMemo, useState } from 'react';
import profileIco3 from '../../assets/images/profile_test3.png';
import UserCorrectionModal from './UserCorrectionModal';
import { retireOrReinstateUser } from '../api/userApi';
import LoadingUi from '../../shared/components/LoadingUi';
import { useNavigate } from 'react-router-dom';

const AdminUserView = ({ params, formatPhoneNumber, koreanPositionTitle, formatSalaryNumber }) => {
    const navigate = useNavigate();
    const [userCorrectionModalshow , setUserCorrectionmodalShow] = useState(false);

    // 퇴사일 기본값: 오늘 (YYYY-MM-DD)
    const today = new Date().toISOString().slice(0, 10);
    const [resignDate, setResignDate] = useState(today);

    // 상세 표시를 제어할 로컬 상태 (만료되면 false로 전환)
    const [visible, setVisible] = useState(true);

    // 서버 params를 그대로 쓰되, 퇴사 처리/취소 시 즉시 반영하기 위해 로컬 resignedAt를 둔다
    const [localResignedAt, setLocalResignedAt] = useState(params?.resignedAt ?? null);

    const isResigned = useMemo(() => !!localResignedAt, [localResignedAt]);

    // 퇴사 만료(퇴사일 + 7일) 계산
    const isExpiredNow = useMemo(() => {
        if (!localResignedAt) return false;
        const resignedMs = new Date(localResignedAt).getTime();
        const expireMs = resignedMs + 7 * 24 * 60 * 60 * 1000; // 7일
        return Date.now() >= expireMs;
    }, [localResignedAt]);

    // 첫 진입 시 이미 7일이 지났으면 즉시 숨기고 리다이렉트
    useEffect(() => {
        if (isExpiredNow) {
            setVisible(false);
            // 원하는 경로로 이동 (예: 퇴사자 리스트나 직원 리스트)
            navigate('/resigned-users', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpiredNow]);

    // 페이지가 열려 있는 동안 만료 예정 시점에 자동으로 리다이렉트
    useEffect(() => {
        if (!localResignedAt) return;
        const resignedMs = new Date(localResignedAt).getTime();
        const expireMs = resignedMs + 7 * 24 * 60 * 60 * 1000;
        const delay = expireMs - Date.now();
        if (delay <= 0) return; // 이미 만료

        const timer = setTimeout(() => {
            setVisible(false);
            navigate('/resigned-users', { replace: true });
        }, delay);

        return () => clearTimeout(timer);
    }, [localResignedAt, navigate]);

    if (!params) return <LoadingUi />;
    if (!visible) return null;

    // 퇴사 처리 (PATCH)
    const handleResign = async () => {
        try {
            if (!resignDate) {
                alert('퇴사 날짜를 선택해주세요.');
                return;
            }
            await retireOrReinstateUser({
                email: params.email,
                resigned: true,
                resignedAt: resignDate, // "YYYY-MM-DD"
            });
            // 새로고침 대신 로컬 상태로 즉시 반영 (페이지는 7일 동안 유지)
            setLocalResignedAt(resignDate);
            alert('퇴사 처리되었습니다. 이 상세 페이지는 7일 후 자동으로 숨겨집니다.');
        } catch (e) {
            alert(e?.response?.data?.message || '퇴사 처리 중 오류가 발생했습니다.');
        }
    };

    // 퇴사 취소 (PATCH)
    const handleReinstate = async () => {
        try {
            await retireOrReinstateUser({
                email: params.email,
                resigned: false,
            });
            setLocalResignedAt(null);
            alert('퇴사 취소되었습니다.');
        } catch (e) {
            alert(e?.response?.data?.message || '퇴사 취소 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='pb-[40px]'>
            <div className='flex flex-col items-center w-[179px] mx-auto mb-[40px]'>
                <img 
                    className='w-[100px] h-[100px] rounded-[50%]'
                    src={params.imgUrl === null ? profileIco3 : params.imgUrl } 
                    alt="직원 프로필 사진" 
                />
                <p className='mt-[24px] mb-[12px] text-[#1F2937]'>{params.userName}</p>
                <div className='flex justify-between w-full'>
                    <p className='text-[#1F2937] text-[14px]'>입사일자</p>
                    <p className='text-[#1F2937] text-[14px]'>{params.hiredAt}</p>
                </div>
            </div>

            <ul>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>이메일</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{params.email}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>연락처</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{formatPhoneNumber(params.phone)}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>직급</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{koreanPositionTitle(params.positionTitle)}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>잔여 연차</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{params.annualLeaveCount}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>주소</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{params.address}</p>
                </li>
                <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                    <p className='text-[14px] text-[#5E6778] mb-[12px]'>연봉</p>
                    <p className='text-[16px] text-[#1F2937] font-[500]'>{formatSalaryNumber(params.salary)}원</p>
                </li>

                {/* 퇴사일 입력/표시 (CSS 변경 없음) */}
                {!isResigned ? (
                    <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                        <p className='text-[14px] text-[#5E6778] mb-[12px]'>퇴사일</p>
                        <input
                            type="date"
                            value={resignDate}
                            onChange={(e) => setResignDate(e.target.value)}
                            className='text-[16px] text-[#1F2937] font-[500] border border-[#E6E8EB] rounded-[8px] p-[8px]'
                        />
                    </li>
                ) : (
                    <li className='pb-[24px] border-b border-[#DEE0E4] mb-[24px]'>
                        <p className='text-[14px] text-[#5E6778] mb-[12px]'>퇴사일</p>
                        <p className='text-[16px] text-[#1F2937] font-[500]'>{localResignedAt}</p>
                    </li>
                )}
            </ul>

            <div className='flex items-center justify-center gap-[12px]'>
                <button    
                    className='w-[135px] h-[36px] border border-[#E6E8EB] rounded-[8px] text-[#1F2937]'
                    onClick={() => setUserCorrectionmodalShow(true)}
                >
                    직원정보 수정
                </button>

                {/* 상태에 따라 처리/취소 분기 (버튼 클래스는 기존 그대로) */}
                {!isResigned ? (
                    <button 
                        className='w-[108px] h-[36px] border border-[#E6E8EB] rounded-[8px] text-[#FF4242]'
                        onClick={handleResign}
                    >
                        퇴사 처리
                    </button>
                ) : (
                    <button 
                        className='w-[108px] h-[36px] border border-[#E6E8EB] rounded-[8px] text-[#FF4242]'
                        onClick={handleReinstate}
                    >
                        퇴사 취소
                    </button>
                )}
            </div>

            {userCorrectionModalshow && 
                <UserCorrectionModal 
                    params={params}
                    closePopup={() => setUserCorrectionmodalShow(false)}
                />
            }
        </div>
    );
};

export default AdminUserView;