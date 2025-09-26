import { create } from "zustand";
import { userMe } from "../features/api/userApi";

export const useAuth = create((set) => ({
    user: null,
    error: null,
    isLogged: false,

    userInfo: async () => {
        try {
            const res = await userMe();
            console.log("userMe 응답:", res.data);

            set({ user: res.data.data, error: null, isLogged: true });
        } catch(err) {
            set({ user: null, error: err.response.data.message, isLogged: false });
        }
    },
}));