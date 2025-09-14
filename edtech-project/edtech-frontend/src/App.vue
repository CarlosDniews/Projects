<template>
  <v-app id="inspire">
    <v-app-bar flat border>
      <v-avatar class="ms-4" size="48">
        <v-img src="./public/favicon.ico" alt="Grupo A Logo"></v-img>
      </v-avatar>
      <v-spacer></v-spacer>

      <div class="d-flex align-center me-4">
        <div style="width: 150px" class="me-4">
          <v-select
            v-model="locale"
            :items="languages"
            item-title="title"
            item-value="value"
            density="compact"
            variant="outlined"
            hide-details
          ></v-select>
        </div>
        <v-btn v-if="authState.isAuthenticated" @click="handleLogout" color="red" variant="tonal">
          Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-if="authState.isAuthenticated" model-value permanent>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-school"
          :title="t('app.academicModule')"
          class="font-weight-bold"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-account-group"
          :title="t('app.students')"
          value="students"
          active
          color="primary"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { authState, authService } from '@/services/authService'

const { t, locale } = useI18n()
const router = useRouter()

const languages = [
  { title: 'Português', value: 'pt' },
  { title: 'English', value: 'en' },
]

const handleLogout = async () => {
  await authService.logout()
  router.push('/login')
}
</script>

<style>
.v-main {
  padding: 2rem;
}
</style>
