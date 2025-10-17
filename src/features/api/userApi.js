import axios from "axios";
//관리자용 직원 리스트
export const userAllLists = async () => {
    const res = await axios.get('https://api.sawonz.world/admin/user/list',
        {withCredentials: true}
    );

    return res;
};

//직원용 직원 리스트
export const userAllListsNotAdmin = async () => {
    const res = await axios.get('https://api.sawonz.world/users/coworkers',
        {withCredentials: true}
    );

    return res;
};

//유저 정보
export const userMe = async () => {
    const res = await axios.get('https://api.sawonz.world/auth/me', 
        {withCredentials: true}
    );

    return res;
};

//관리자 유저 정보 수정
export const userInfoPatch = async ({ email, salary, annualLeaveCount, positionTitle, hiredAt }) => {
    const res = await axios.patch('https://api.sawonz.world/admin/user/info', 
        {
            email,
            salary,
            annualLeaveCount,
            positionTitle,
            hiredAt
        },
        {withCredentials: true}
    );

    return res;
};

// 직원 본인 정보 조회
export const staffGetFetch = async () => {
    const res = await axios.get('https://api.sawonz.world/users/my-info',
        {withCredentials:true}
    );

    return res;
};

//직원 본인 정보 수정
export const staffInfoPatch = async ({ address, phone }) => {
    const res = await axios.patch('https://api.sawonz.world/users/my-info', 
        {
            address,
            phone
        },
        {withCredentials: true}
    );

    return res;
};

//프로필 수정
export const profilePut = async (formData) => {
    return await axios.put('https://api.sawonz.world/users/img', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
};

//프로필 삭제
export const profileDelete = async () => {
    try {
        const token = localStorage.getItem('token');
        return await axios.delete('https://api.sawonz.world/users/img', {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {},
            withCredentials: true, // 쿠키 인증 필요하면 추가
        });
    } catch (err) {
        console.error('프로필 삭제 API 오류:', err.response?.data?.message || err);
        throw err;
    }
};

//퇴사처리
export const retireOrReinstateUser = async (payload) => {
    // 안전장치: resigned=true면 resignedAt 없으면 에러
    if (payload?.resigned === true && !payload?.resignedAt) {
        throw new Error("resigned=true면 resignedAt(YYYY-MM-DD)이 필요합니다.");
    }

    // 필요 시 withCredentials 유지
    const { data } = await axios.patch("https://api.sawonz.world/admin/user/resign", payload, {
        withCredentials: true,
    });
    return data; // 컨벤션에 맞게 data만 반환
};