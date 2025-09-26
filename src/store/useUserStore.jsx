import { create } from "zustand";
import { userMe } from "../features/api/userApi";

export const useAuth = create((set) => ({
    user: null,
    error: '',
    isLogged: false,
    isLoading: false,

    userInfo: async () => {
        try {
            set({ isLoading: true })

            const res = await userMe();
            console.log("userMe 응답:", res.data);

            set({ user: res.data.data, error: null, isLogged: true, isLoading: false });
        } catch(err) {
            set({ user: null, error: `${err} 로그인 정보 없음`, isLogged: false, isLoading: false });
        }
    },
}));