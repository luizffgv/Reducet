const path = require("node:path");
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  async redirects() {
    return [
      {
        source: "/pt-BR/categories/:id*",
        destination: "/pt-BR/categorias/:id*",
        permanent: true,
      },
      {
        source: "/pt-BR/about",
        destination: "/pt-BR/sobre",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pt-BR/categorias/:id*",
        destination: "/pt-BR/categories/:id*",
      },
      {
        source: "/pt-BR/sobre",
        destination: "/pt-BR/about",
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src/");

    return config;
  },
});

module.exports = nextConfig;
