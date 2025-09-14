import { reactive } from 'vue'
import api from '@/services/apiService' // O mesmo apiService de sempre

export const authState = reactive({
  user: null,
  isAuthenticated: false,
})

export const authService = {
  async login(credentials) {
    try {
      // Agora chamamos o método que existe no objeto "api"
      const response = await api.login(credentials)
      authState.user = response.data.user
      authState.isAuthenticated = true
      return true
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  },

  async checkAuth() {
    try {
      const response = await api.getMe()
      authState.user = response.data.user
      authState.isAuthenticated = true
    } catch {
      authState.user = null
      authState.isAuthenticated = false
    }
  },

  async logout() {
    try {
      await api.logout()
    } finally {
      authState.user = null
      authState.isAuthenticated = false
    }
  },
}
