
const routes = [

  {
    path: '/',

    component: () => import('layouts/MainLogin.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue') }

    ]
  },
  {
    path: '/',

    component: () => import('layouts/LayoutMenuLateral2.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/Index.vue') },
      { path: '/inventarios', component: () => import('pages/Inventario.vue') },
      { path: '/gestionar', component: () => import('pages/Gestionar.vue') },
      { path: '/conteo', component: () => import('pages/Conteo.vue') },
      { path: '/usuarios', component: () => import('pages/Usuarios.vue') },
      { path: '/rondas', component: () => import('pages/prueba.vue') },
      { path: '/perfiles', component: () => import('pages/Perfiles.vue') }

    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
