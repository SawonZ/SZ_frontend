import { create } from "zustand";
import { userAllLists, userAllListsNotAdmin, userMe } from "../features/api/userApi";
import { persist } from "zustand/middleware";
import { fetchLogout } from "../features/api/authApi";

//로그인, 로그아웃
export const useAuth = create(
    (set) => ({
        user: null,
        error: '',
        isLogged: false,
        isLoading: false,

        login: async () => {
            try {
                set({ isLoading: true })

                const res = await userMe({ withCredentials: true });

                set({ user: res.data.data, error: null, isLogged: true, isLoading: false });
            } catch(err) {
                set({ user: null, error: `${err} 로그인 정보 없음`, isLogged: false, isLoading: false });
            }
        },

        logout: async () => {
            try {
                set({ isLoading: true });

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
        isLoading: false,
        error: null,

        //관리자용 직원 리스트
        userLists: async () => {
            try {
                set({ isLoading: true });

                const res = await userAllLists();
                console.log(res.data.data)

                set({ users: res.data.data, isLoading: false, error: null });
                console.log(res.data.message);
            } catch(err) {
                set({ users: [], isLoading: false, error: err.response?.data?.message});
                console.log(err.response?.data?.message)
            }
        },
    })
);

export const useUserInquiryPortion = create(
    (set) => ({
        usersPortion: [],
        isLoading: false,
        error: null,

        //직원용 직원 리스트
        userListsNotAdmin: async () => {
            try{
                set({ isLoading: true });

                const res = await userAllListsNotAdmin();
                console.log(res.data.data);

                set({ usersPortion: res.data.data, isLoading: false, error: null });
                console.log(res.data.message);
            }catch(err) {
                set({ usersPortion: [], isLoading: false, error: err.response?.data?.message });
                console.log(err.response?.data?.message)
            }
        },
    }) 
);