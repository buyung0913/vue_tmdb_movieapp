import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useLoginViewModel() {
  const error = ref('')
  const loading = ref(false)
  const service = inject('tmdbService')
  const router = useRouter()
  const auth = useAuthStore()

  const failedAttempts = ref(0)
  const isBlocked = ref(false)
  const blockTimer = ref(0)
  let blockInterval = null

  const login = async (username, password) => {
    if (isBlocked.value) {
      error.value = `Terlalu banyak percobaan. Coba lagi dalam ${blockTimer.value} detik.`
      return
    }

    error.value = ''
    loading.value = true

    try {
      const tokenRes = await service.getRequestToken()
      const token = tokenRes.request_token

      const loginRes = await service.login(username, password, token)
      if (!loginRes.success) throw new Error('Login gagal. Username atau password salah.')

      const sessionData = await service.createSession(token)
      if (!sessionData.success) throw new Error('Gagal membuat sesi.')

      auth.setSession(sessionData.session_id)
      router.push('/')

      // reset percobaan gagal setelah login berhasil
      failedAttempts.value = 0
      clearInterval(blockInterval)
      isBlocked.value = false
    } catch (err) {
      failedAttempts.value++
      error.value = err.message || 'Terjadi kesalahan saat login.'

      if (failedAttempts.value >= 3) {
        startBlock()
      }
    } finally {
      loading.value = false
    }
  }

  const startBlock = () => {
    isBlocked.value = true
    blockTimer.value = 30

    blockInterval = setInterval(() => {
      blockTimer.value--
      if (blockTimer.value <= 0) {
        clearInterval(blockInterval)
        isBlocked.value = false
        failedAttempts.value = 0
      }
    }, 1000)
  }

  return {
    login,
    error,
    loading,
    isBlocked,
    blockTimer
  }
}
