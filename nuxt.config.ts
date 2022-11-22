// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@vueuse/nuxt'],
  build: {
    transpile: ['@heroicons/vue']
  },
  routeRules: {
    '/map/**': {
      ssr: false,
    },
    '/clients/**': {
      ssr: true,
    },
    '/routes/**': {
      ssr: false,
    }
  },
  runtimeConfig: {
    public: {
      MAPBOX_PUBLIC_TOKEN: "pk.eyJ1IjoiZmVyY2hvNTY1NiIsImEiOiJjbGFleHVuaW8wOWdhM3hxcmZtNGY3djN1In0.vkQNBTIk8v50i7QzKvnrDQ",
      GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
    }
  }
})
