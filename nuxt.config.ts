export default {
  ssr: false,
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "COMPSSAcademy",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      // script: [
      //   {
      //     src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg&libraries=places`, // Add your API key
      //     async: true,
      //     defer: true,
      //   },
      // ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  plugins: ["~/plugins/aos.client.ts"],
  css: ['@/assets/css/main.css'],
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  modules: ['@kevinmarrec/nuxt-pwa',"@nuxtjs/tailwindcss", "nuxt-emoji-picker"],
  pwa: {
    workbox: {
      enabled: true
    },
    meta: {
      title: "COMPSSAcademy",
      author: "Marquis",
      mobileAppIOS: false,
      mobileApp: true,
      description:
        "Simplify access to lecture notes, past questions, and collaborative tools. Foster teamwork, improve academic performance, and unlock your full potential with COMPSSA..",
      theme_color: "#27396B",
      background_color: "#27396B",
      display: "standalone",
      start_url: "/",
      nativeUI: true,
    },
    icon: {
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: "Achilles Drill",
      lang: "fa",
      useWebmanifestExtension: false,
    },
    runtimeCaching: [
      {
        urlPattern: "https://fonts.googleapis.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://fonts.gstatic.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "https://cdn.snipcart.com/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern:
          "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  }
  // modules: [
  //   '@nuxtjs/pwa'
  // ],
  // pwa: {
  //   manifest: {
  //     name: 'My Awesome Nuxt 3 PWA',
  //     short_name: 'Nuxt3PWA',
  //     lang: 'en',
  //     useWebmanifestExtension: false,
  //     display: 'standalone',
  //     theme_color: '#4DBA87',
  //     background_color: '#000000'
  //   },
  //   workbox: {
  //     // Workbox options for customizing the service worker
  //   }
  // }
};
