import React, { useEffect, useState } from 'react';
import { staffGetFetch } from '../api/userApi';

const useStaffData = () => {
    const [staffData, setStaffData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    return {staffData, isLoading}
};

export default useStaffData;