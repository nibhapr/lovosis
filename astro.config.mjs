import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: "https://lovosis.com/",
  prefetch: true,
  integrations: [
    tailwind(),
    partytown(),
    astroExpressiveCode(),
    robotsTxt({
      policy: [
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/search'],
          crawlDelay: 2,
        },
        {
          userAgent: 'OtherBot',
          allow: ['/allow-for-all-bots', '/allow-only-for-other-bot'],
          disallow: ['/admin', '/login'],
          crawlDelay: 2,
        },
        {
          userAgent: '*',
          allow: '/',
          disallow: '/search',
          crawlDelay: 10,
          cleanParam: 'ref /articles/',
        },
      ],
    }),
    mdx(),
       sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          fr: "fr",
        },
      },
    }),
    starlight({
      title: "Uniview support center",
      defaultLocale: "root",

      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },

      sidebar: [
        {
          label: "Support Center",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "Trouble shooting tips",
          items: [
            {
              label: "CCTV Camera",
              link: "support/cctv/",
            },
            // {
            //   label: "NVR or DVR",
            //   link: "support/nvr/",
            // },
          ],
        },
        // {
        //   label: "Construction Services",
        //   autogenerate: {
        //     directory: "support",
        //   },
        // },
      ],
      social: {
        facebook:
          "https://www.facebook.com/p/LOVOSIS-TECHNOLOGY-100083060600975",
      },
      disable404Route: true,
      customCss: ["./src/assets/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
        MobileMenuFooter:
          "./src/components/ui/starlight/MobileMenuFooter.astro",
        ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://lovosis.com/" + "/social.webp",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://lovosis.com/" + "/social.webp",
          },
        },
      ],
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    react(),
  ],
  output: "static",
  experimental: {

  },
  adapter: vercelStatic(),
  // content: {
  //   collections: ['westerdigital']
  // }
});
