const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/doctors', component: () => import('pages/DoctorsPage.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('src/pages/SignInPage.vue')
  },
  {
    path: '/registration',
    component: () => import('src/pages/RegistrationPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
