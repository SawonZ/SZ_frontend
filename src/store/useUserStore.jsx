import { create } from "zustand";
import { userMe } from "../features/api/userApi";
import { persist } from "zustand/middleware";

export const useAuth = create(
    persist(
        (set) => ({
            user: null,
            error: '',
            isLogged: false,
            isLoading: false,

            login: async () => {
                try {
                    set({ isLoading: true })

                    const res = await userMe();

                    set({ user: res.data.data, error: null, isLogged: true, isLoading: false });
                } catch(err) {
                    set({ user: null, error: `${err} 로그인 정보 없음`, isLogged: false, isLoading: false });
                }
            },
        })
    )
);