import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
    user: undefined,
    checkAuth: async () => {
        try {
            const res = await fetch("https://friendly-telegram-x5v6p759jwq9c99rr-3000.app.github.dev/auth/me", {
                credentials: "include"
            })

            if (!res.ok) throw new Error(res.error)

            const data = await res.json()

            if (!data) return

            set((state) => ({ ...state, user: data }))
        } catch (error) {
            console.error(error)
        }
    },
    clearUser: () => {
        set((state) => ({...state, user: undefined}))
    },
    csrfToken: undefined,
    getCsrfToken: async() => {
      try {
            const res = await fetch("https://friendly-telegram-x5v6p759jwq9c99rr-3000.app.github.dev/csrf-token", {
                credentials: "include"
            })

            if (!res.ok) throw new Error(res.error)

            const data = await res.json()

            if (!data) return

            set((state) => ({ ...state, csrfToken: data.token }))
        } catch (error) {
            console.error(error)
        }  
    }
}))