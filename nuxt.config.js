require('dotenv').config();
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#c5c5c5' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/vendor/nucleo/css/nucleo.css',
    '~/assets/css/argon.scss',
    '~/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/argon-dashboard.js' },
    { src: '~/plugins/amCharts.js', ssr: false },
    { src: '~/plugins/input-mask.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    'vue-sweetalert2/nuxt',
    [
      'nuxt-fontawesome', {
        imports: [
         {
           set: '@fortawesome/free-solid-svg-icons',
           icons: ['fas']
         },
         {
           set:'@fortawesome/free-brands-svg-icons',
           icons: ['fab']
         }
       ]
      }
    ]
  ],

  moment: {
    timezone: true,
    defaultTimezone: 'America/Los_Angeles'
  },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3977/api',
    redirectError: {
      401: '/login',
      404: '/notfound'
    }
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/schemes/local.html#usage
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/profile', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: false
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login'
    },
    token: {
      prefix: 'token.'
    },
    localStorage: {
      prefix: 'auth.admin.'
    }
  },

  router: {
    middleware: ['auth']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
