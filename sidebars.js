module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'home', // Соответствует файлу home.md
    },
    {
      type: 'category',
      label: 'Методы API',
      items: [
        'methods',   // methods.md
        'hooks',     // hooks.md
      ],
    },
    {
      type: 'doc',
      id: 'sdk',     // sdk.md
    },
    {
      type: 'doc',
      id: 'errors',   // errors.md
    }
  ],
};