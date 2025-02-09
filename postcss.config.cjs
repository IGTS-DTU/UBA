module.exports = {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.cjs" // Point to your config file
    },
    autoprefixer: {}
  }
}