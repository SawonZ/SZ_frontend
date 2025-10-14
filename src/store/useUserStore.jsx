import { create } from "zustand";
import { userAllLists, userAllListsNotAdmin, userMe } from "../features/api/userApi";
import { fetchLogout, refreshToken } from "../features/api/authApi";

//로그인, 로그아웃
export const useAuth = create((set) => ({
    user: null,
    error: '',
    isLogged: false,
    isLoading: true,

    login: async () => {
        try {
        const res = await userMe(); // accessToken 쿠키 기반으로 인증됨
        set({ user: res.data.data, isLogged: true, isLoading: false });
        } catch (err) {
        // accessToken 만료 → refresh 시도
        if (err.response?.status === 401) {
            try {
            await refreshToken(); // 새 쿠키 갱신
            const res2 = await userMe(); // 다시 유저 정보 요청
            set({ user: res2.data.data, isLogged: true, isLoading: false });
            return;
            } catch (refreshErr) {
            console.error('리프레시 실패:', refreshErr);
            }
        }
        set({ user: null, isLogged: false, isLoading: false });
        }
    },

    logout: async () => {
        try {
        await fetchLogout(); // 서버가 access/refresh 쿠키 둘 다 clear
        set({ user: null, isLogged: false, isLoading: false });
        } catch (err) {
        set({ error: `${err} 로그아웃 실패`, isLogged: false });
        }
    },
}));

export const useUserInquiry = create(
    (set) => ({
        users: [],
        isLoading: true,
        error: '',
        situation: 'loading',

        //관리자용 직원 리스트
        userLists: async () => {
            try {
                const res = await userAllLists();

                set({ users: res.data.data, isLoading: false, situation: 'success', error: '' });
            } catch(err) {
                set({ users: [], isLoading: false, situation: 'error', error: err.response?.data?.message});
                console.log(err.response?.data?.message)
            }
        },
    })
);

export const useUserInquiryPortion = create(
    (set) => ({
        usersPortion: [],
        isLoading: true,
        error: '',
        situation: 'loading',

        //직원용 직원 리스트
        userListsNotAdmin: async () => {
            try{
                const res = await userAllListsNotAdmin();
                set({ usersPortion: res.data.data, isLoading: false, situation: 'success', error: '' });
            }catch(err) {
                set({ usersPortion: [], isLoading: false, situation: 'error', error: err.response?.data?.message });
                console.log(err.response?.data?.message)
            }
        },
    }) 
);