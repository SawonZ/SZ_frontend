import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import useLoading from '../features/hooks/useLoading';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import usePositionTitle from '../features/hooks/usePositionTitle';
import AdminUserView from '../features/components/adminUserView';
import { useUserInquiry } from '../store/useUserStore';

const UserView = () => {
    const { users, situation, error, userLists } = useUserInquiry();
    const { userListLoading } = useLoading();
    const {koreanPositionTitle} = usePositionTitle();
    const { email } = useParams();

    // 사용자 목록 초기화 / 관리자용 API
    useEffect(() => {
        userLists();        
    }, [userLists]);

    const filtedParams = users.filter(u => u.email === email).find(u => u.email === email);

    //연락처 형식 변환
    const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        const cleaned = phone.replace(/\D/g, ""); // 숫자만 추출

        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    // 연봉 3자리마다 콤마 표시
        const formatSalaryNumber = (salary) => {
            if (salary == null) return "";
            const cleaned = String(salary).replace(/\D/g, "");
    
            return Number(cleaned).toLocaleString();
        };

    // 로딩/에러 처리
    const pending = userListLoading(situation, error, users);
    if (pending) return pending;

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !h-[auto]`}>
                <h4 className={`${title2} text-left`}>직원 정보</h4>
                <AdminUserView 
                    params={filtedParams}
                    formatPhoneNumber={formatPhoneNumber}
                    koreanPositionTitle={koreanPositionTitle}
                    formatSalaryNumber={formatSalaryNumber}
                />
            </div>
        </main>
    );
};

export default UserView;