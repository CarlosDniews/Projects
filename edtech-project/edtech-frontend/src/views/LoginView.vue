<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
                class="my-4"
                variant="outlined"
                hide-details="auto"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                class="mb-4"
                variant="outlined"
                hide-details="auto"
              ></v-text-field>

              <v-alert v-if="error" type="error" dense class="mb-4" variant="tonal">
                {{ error }}
              </v-alert>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" variant="flat">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  const success = await authService.login({ email: email.value, password: password.value })

  if (success) {
    router.push('/')
  } else {
    error.value = 'Invalid credentials. Please try again.'
  }
}
</script>
