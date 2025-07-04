/** PostCSS Konfiguration für Tailwind v4 + Next 15  */
const plugins = process.env.VITEST
  ? []
  : [
      '@tailwindcss/postcss', // ➜ neues offizielles Plugin ab Tailwind 4
      'autoprefixer',
    ];

module.exports = { plugins };
