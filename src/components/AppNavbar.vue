<template>
  <nav class="navbar">
    <div class="navbar-left">
      <h1 class="app-title">Vue MovieApp</h1>
    </div>
    <div class="navbar-right">
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('session_id')
  router.push('/login')
}
</script>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* color: white; */
  padding: 1rem 2rem;
}
.app-title {
  margin: 0;
  font-size: 1.2rem;
}
.logout-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}
.logout-btn:hover {
  background: #d9363e;
}
</style>
