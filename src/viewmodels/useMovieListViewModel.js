import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { handleTokenError } from '../utils/handleTokenError'

export function useMovieListViewModel() {
  const movies = ref([])
  const loading = ref(false)
  const error = ref('')
  const query = ref('')
  const currentPage = ref(1)
  const totalPages = ref(1)
  const router = useRouter()

  const service = inject('tmdbService')

  const fetchMovies = async (page = 1) => {
    loading.value = true
    error.value = ''
    try {
      const sessionId = localStorage.getItem('session_id')
      const data = query.value
        ? await service.searchMovies(query.value, page, sessionId)
        : await service.getMovieList(page, sessionId)

      handleTokenError(data, router)

      if (!Array.isArray(data.results)) throw new Error('Gagal mengambil data film')

      if (data.results.length === 0 && page > 1) {
        await fetchMovies(page - 1)
        return
      }

      movies.value = data.results
      totalPages.value = data.total_pages
      currentPage.value = page
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat memuat film'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchMovies())

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    fetchMovies,
    query
  }
}
