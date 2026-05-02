import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Profile, UserRole } from '../types'
import { supabase } from '../config/supabase'

interface AuthState {
  user:       Profile | null
  isLoading:  boolean
  isVerified: boolean
  role:       UserRole | null

  setUser:     (user: Profile | null) => void
  setLoading:  (loading: boolean) => void
  logout:      () => Promise<void>
  initialize:  () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user:       null,
      isLoading:  true,
      isVerified: false,
      role:       null,

      setUser: (user) =>
        set({
          user,
          role:       user?.role ?? null,
          isVerified: user?.is_verified ?? false,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: async () => {
        await supabase.auth.signOut()
        set({ user: null, role: null, isVerified: false })
      },

      initialize: async () => {
        set({ isLoading: true })
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
            get().setUser(profile)
          } else {
            get().setUser(null)
          }
        } catch {
          get().setUser(null)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name:    'bloodcare-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, role: state.role }),
    }
  )
)
