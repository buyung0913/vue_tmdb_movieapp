import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  params: {
    api_key: process.env.VUE_APP_API_KEY
  }
})

axiosInstance.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.sessionId) {
    config.params = { ...config.params, session_id: auth.sessionId }
  }
  return config
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const auth = useAuthStore()
    const router = window.$router || null

    if (error.response && [401, 403].includes(error.response.status)) {
      auth.logout()
      if (router) router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default {
  install(app) {
    app.config.globalProperties.$axios = axiosInstance
    app.provide('axios', axiosInstance)
    window.$axios = axiosInstance
  }
}
