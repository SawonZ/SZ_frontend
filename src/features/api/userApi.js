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