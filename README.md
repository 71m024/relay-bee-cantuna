# Todo

 - readme aufräumen
   - Todos in Zukunft in einen Issue

## Prio 2 (erstmal in einen Issue)

 - Checken, warum bei den DateInputs, rechts so viel Platz ist aber kein Hinweis?
 - Die Library im OAD-Backend testweise einbauen
   - Fehler beheben
   - Alle Komponenten von relay-bee verwenden und im oad-backend löschen
 - Herausfinden, warum im refetch-fragment im oad-backend auf der act-page keine eslint-warning kommt
    - wenn ich ein Property eingebe, welches es nicht gibt
    - gemeint ist inline in webstorm
    - Ist zumindest auf meinem MacBook Air so
    - Ev einmal abwarten ob das auch bei weiteren Projekten (FlexiRent so sein wird?)
    - Ev versuchen herauszufinden, was auf dem MacBook PRO anders konfiguiert ist, dass es dort geht?
 - Schauen, dass nicht immer zuerst die unsortierte Liste ladet und dann die sortierte reinglitcht. ist ziemlich unsexy.
 - Unterschied zwischen LoadingIndicator und Spinner?
 - Wenn relay-bee komplett extrahiert ist, checken ob der LoadingIndicator im Suspense vom NavigationLayout wieder funktioniert?
   - Funktioniert momentan auf der ActList nicht. Dort wird beim Laden der Tabellen-Header angezeigt und sonst nichts

<img src="public/logo.png" alt="Sample Image" style="width: 300px;">

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
