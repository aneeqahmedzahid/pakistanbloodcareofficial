import { create } from 'zustand'

interface UIState {
  isDarkMode:      boolean
  isSidebarOpen:   boolean
  isModalOpen:     boolean
  activeModal:     string | null

  toggleDarkMode:  () => void
  setDarkMode:     (dark: boolean) => void
  toggleSidebar:   () => void
  setSidebarOpen:  (open: boolean) => void
  openModal:       (modalId: string) => void
  closeModal:      () => void
}

export const useUIStore = create<UIState>()((set) => ({
  isDarkMode:    false,
  isSidebarOpen: true,
  isModalOpen:   false,
  activeModal:   null,

  toggleDarkMode: () =>
    set((s) => {
      const next = !s.isDarkMode
      document.documentElement.classList.toggle('dark', next)
      return { isDarkMode: next }
    }),

  setDarkMode: (dark) => {
    document.documentElement.classList.toggle('dark', dark)
    set({ isDarkMode: dark })
  },

  toggleSidebar:  () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  openModal:      (modalId) => set({ isModalOpen: true, activeModal: modalId }),
  closeModal:     () => set({ isModalOpen: false, activeModal: null }),
}))
