import { createRouter, createWebHistory } from 'vue-router'

import { authState, authService } from '@/services/authService'

import StudentListView from '@/views/StudentListView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Students',
    component: StudentListView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // A função checkAuth verifica se existe um cookie de sessão válido no backend
  // A verificação só é necessária uma vez por carregamento da página
  if (authState.user === null) {
    await authService.checkAuth()
  }

  const isAuthenticated = authState.isAuthenticated
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated) {
    // Se a rota exige login e o usuário NÃO está autenticado,
    // redireciona para a página de login.
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // Se o usuário JÁ está autenticado e tenta acessar a página de login,
    // redireciona para a página principal.
    next('/')
  } else {
    // Em todos os outros casos, permite a navegação.
    next()
  }
})

export default router
