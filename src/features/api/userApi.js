import axios from "axios";

export const userMe = async () => {
    const res = await axios.get('https://api.sawonz.world/auth/me', 
        {withCredentials: true}
    );

    return res;
};