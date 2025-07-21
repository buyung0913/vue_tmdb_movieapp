<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home-view">
    <AppNavbar />
    <input
      v-model="query"
      @keyup.enter="fetchMovies(1)"
      placeholder="Cari film..."
      class="search-input"
    />

    <div v-if="loading">Memuat film...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="movies.length === 0 && !loading">
      <p style="text-align:center">Tidak ada film ditemukan.</p>
    </div>
    <div v-else>
      <div class="movie-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
          <h3>{{ movie.title }}</h3>
        </div>
      </div>

      <div class="pagination">
        <button @click="fetchMovies(1)" :disabled="currentPage === 1">«</button>
        <button
        v-for="page in getPageNumbers()"
        :key="page"
        :class="{ active: page === currentPage.value }"
        @click="fetchMovies(page)">
        {{ page }}
        </button>
        <button @click="fetchMovies(totalPages)" :disabled="currentPage === totalPages">»</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import { useMovieListViewModel } from '../viewmodels/useMovieListViewModel'

const getPageNumbers = () => {
  const pages = []
  const max = 5
  const start = Math.max(1, currentPage.value - Math.floor(max / 2))
  const end = Math.min(totalPages.value, start + max - 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

const {
  movies,
  loading,
  error,
  currentPage,
  totalPages,
  fetchMovies,
  query
} = useMovieListViewModel()
</script>

<style scoped>
.home-view {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 kolom */
  gap: 20px;
}

.movie-card {
  background: #f3f3f3;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.movie-card:hover {
  transform: scale(1.03);
}

h3 {
  margin-top: 10px;
  font-size: 1rem;
}
.error {
  color: red;
}

.search-input {
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 10px auto;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
  min-width: 36px;
}

.pagination button.active {
  background: #333;
  color: #fff;
  font-weight: bold;
}
</style>