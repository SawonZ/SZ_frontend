import axios from "axios";

const api = import.meta.env.VITE_PUBLIC_API;

// 공지사항 등록
export const noticeRegistration = async ({ title, content }) => {
  const res = await axios.post(
    `${api}/board/notice`,
    {
      title,
      content,
    },
    { withCredentials: true }
  );

  return res;
};

// 공지사항 목록 조회
export const noticeGet = async () => {
  const res = await axios.get(`${api}/board/notice`, {
    withCredentials: true,
  });
  return res.data;
};

// 공지 상세 조회
export const noticeGetDetail = async (noticeId) => {
  const res = await axios.get(`${api}/board/notice/${noticeId}`, {
    withCredentials: true,
  });
  return res.data;
};

// 공지 삭제
export const noticeDelete = async (noticeId) => {
  const res = await axios.delete(`${api}/board/notice/${noticeId}`, {
    withCredentials: true,
  });
  return res.data;
};

// 공지 수정
export const noticeUpdate = async ({ noticeId, title, content }) => {
  const res = await axios.put(
    `${api}/board/notice/${noticeId}`,
    { title, content },
    { withCredentials: true }
  );
  return res.data;
};