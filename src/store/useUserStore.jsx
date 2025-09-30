import { create } from "zustand";
import { userAllLists, userAllListsNotAdmin, userMe } from "../features/api/userApi";
import { fetchLogout } from "../features/api/authApi";

//로그인, 로그아웃
export const useAuth = create(
    (set) => ({
        user: null,
        error: '',
        isLogged: false,
        isLoading: true,

        login: async () => {
            try {
                const res = await userMe();

                set({ user: res.data.data, error: null, isLogged: true, isLoading: false });
            } catch(err) {
                set({ user: null, error: `${err} 로그인 정보 없음`, isLogged: false, isLoading: false });
            }
        },

        logout: async () => {
            try {
                await fetchLogout();

                set({ user: null, error: '', isLogged: false, isLoading: false });
            } catch(err) {
                set({ error: `${err} 로그아웃 실패`, isLoading: false });
            }
        },
    })
);

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