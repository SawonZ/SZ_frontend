import axios from "axios";

export const noticeRegistration = async ({ title, content }) => {
    const res = await axios.post('https://api.sawonz.world/board/notice', 
        {
            title,
            content
        },
        {withCredentials: true}
    );

    return res;
};

export const noticeGet = async () => {
    const res = await axios.get('https://api.sawonz.world/board/notice', {
        withCredentials: true,
    });
    return res.data;
};

// 공지 상세 조회
export const noticeGetDetail = async (noticeId) => {
    const res = await axios.get(`https://api.sawonz.world/board/notice/${noticeId}`, {
        withCredentials: true,
    });
    return res.data;
};

// 공지 삭제
export const noticeDelete = async (noticeId) => {
    const res = await axios.delete(`https://api.sawonz.world/board/notice/${noticeId}`, {
        withCredentials: true,
    });
    return res.data;
};

// 공지 수정
export const noticeUpdate = async ({ noticeId, title, content }) => {
    const res = await axios.put(`https://api.sawonz.world/board/notice/${noticeId}`, 
        { title, content },
        { withCredentials: true }
    );
    return res.data;
};