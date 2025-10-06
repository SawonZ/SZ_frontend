import React, { useEffect, useState } from 'react';
import { mainContentsTwo, mainLayout, title2 } from '../shared/styles/commonTailwind';
import StaffUserView from '../features/components/StaffUserView';
import usePositionTitle from '../features/hooks/usePositionTitle';
import { staffGetFetch } from '../features/api/userApi';
import LoadingUi from '../shared/components/LoadingUi';

const StaffView = () => {
    const [staffData, setStaffData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {koreanPositionTitle} = usePositionTitle();

    console.log(staffData)

    useEffect(() => {
        const staffFetch = async () => {
            setIsLoading(true);

            try{
                const res = await staffGetFetch();

                if(res.data.responseCode !== "SUCCESS") {
                    console.log('내 정보 조회 오류');
                    return;
                }

                setStaffData(res.data.data);
            } catch(err) {
                console.log('에러 내용 :', err);
                console.error(err.response?.data.message);
            } finally {
                setIsLoading(false);
            }
        };

        staffFetch();
    }, []);

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
    if (isLoading) return <LoadingUi />;

    return (
        <main className={mainLayout}>
            <div className={`${mainContentsTwo} !h-[auto]`}>
                <h4 className={`${title2} text-left`}>내 정보</h4>
                <StaffUserView 
                    params={staffData}
                    formatPhoneNumber={formatPhoneNumber}
                    koreanPositionTitle={koreanPositionTitle}
                    formatSalaryNumber={formatSalaryNumber}
                />
            </div>
        </main>
    );
};

export default StaffView;