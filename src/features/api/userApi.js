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