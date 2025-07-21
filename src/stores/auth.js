import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionId: localStorage.getItem('session_id') || null,
    isAuthenticated: !!localStorage.getItem('session_id')
  }),
  actions: {
    setSession(sessionId) {
      this.sessionId = sessionId
      this.isAuthenticated = true
      localStorage.setItem('session_id', sessionId)
    },
    logout() {
      this.sessionId = null
      this.isAuthenticated = false
      localStorage.removeItem('session_id')
    }
  }
})
