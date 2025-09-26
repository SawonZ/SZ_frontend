import axios from "axios";
//유저 전체 조회


//유저 정보
export const userMe = async () => {
    const res = await axios.get('https://api.sawonz.world/auth/me', 
        {withCredentials: true}
    );

    return res;
};