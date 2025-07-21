export function handleTokenError(response, router) {
  if (response.status_code === 3 || response.status_code === 30) {
    localStorage.removeItem('session_id')
    router.push('/login')
    throw new Error('Sesi kamu sudah expired. Silakan login ulang.')
  }
}