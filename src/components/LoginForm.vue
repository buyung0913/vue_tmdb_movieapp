<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Masuk ke Akun</h2>

      <Form @submit="onSubmit" :validation-schema="schema" class="form-content">
        <div class="form-group">
          <Field name="username" as="input" placeholder="Username" class="input" />
          <ErrorMessage name="username" class="error-message" />
        </div>

        <div class="form-group password-wrapper">
          <Field
            :type="showPassword ? 'text' : 'password'"
            name="password"
            as="input"
            placeholder="Password"
            class="input password-input"
          />

          <span class="toggle-password" @click="showPassword = !showPassword">
            <font-awesome-icon :icon="showPassword ? 'fa-eye-slash' : 'fa-eye'" />
          </span>
          <ErrorMessage name="password" class="error-message" />
        </div>

        <button type="submit" class="btn" :disabled="loading">
          {{ isBlocked ? `Tunggu ${blockTimer} detik` : (loading ? 'Memproses...' : 'Login') }}
        </button>
      </Form>

      <p v-if="error" class="form-error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useLoginViewModel } from '../viewmodels/useLoginViewModel'

const { login, error, loading } = useLoginViewModel()
const showPassword = ref(false)

const schema = yup.object({
  username: yup.string().required('Username wajib diisi').min(3, 'Minimal 3 karakter'),
  password: yup.string().required('Password wajib diisi').min(4, 'Minimal 4 karakter'),
})

const onSubmit = async (values) => {
  await login(values.username, values.password)
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9fafb;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 350px;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;
  box-sizing: border-box;
}


.input:focus {
  outline: none;
  border-color: #333;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  color: #333;
  cursor: pointer;
  font-size: 1.1rem;
  user-select: none;
}

.password-input {
  padding-right: 2.5rem;
}

.btn {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  box-sizing: border-box;
}

.btn:hover {
  background-color:  #474747;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  font-size: 0.85rem;
  color: #d93025;
  margin-top: 0.25rem;
}

.form-error {
  margin-top: 1rem;
  text-align: center;
  color: red;
}
</style>
