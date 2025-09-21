import axios from 'axios';

export const fetchSignUp = async ({name, phone, email, password}) => {
    const res = await axios.post('...API주소...',
        {
            name,
            phone,
            email,
            password
        },
        {withCredentials: true}
    );

    return res;
};

export const fetchLogin = async ({email, password}) => {
    const res = await axios.post('...API주소...',
        {
            email,
            password
        },
        {withCredentials: true}
    );

    return res;
};