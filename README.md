# Charlotte — AI Draft to Human Copy (DACH)

This repository contains a small, fully static landing page for the service “Charlotte — AI Draft → Human Copy (DACH)”. The page is built without any external build tools or dependencies and is suitable for deployment on GitHub Pages. It supports both German and English via a simple language toggle and does not require JavaScript for basic functionality.

## Features

* **Bilingual content** – All visible text is available in German and English. Visitors can switch languages using the toggle in the header. The choice persists across reloads via `localStorage`.
* **Accessible and responsive design** – The page includes a skip link, visible focus styles, sufficient colour contrast and works on both mobile and desktop devices. Smooth scrolling respects the user’s *prefers‑reduced‑motion* setting.
* **Contact form with mailto** – The form validates required fields client‑side. Submitting the form opens the user’s email programme with a pre‑composed message. No backend is used.
* **Modal dialogs** – The Impressum (legal notice) and Datenschutz (privacy policy) are presented in CSS‑only modals and can be dismissed with the escape key or by clicking the close buttons.
* **No external dependencies** – Only four files live at the repository root: `index.html`, `styles.css`, `app.js` and this `README.md`.

## Running locally

You can preview the site by opening `index.html` directly in your browser. All assets are loaded relative to the root of the repository. For a production setup, enable GitHub Pages on the `main` branch and set the source folder to “/ (root)”.

## Editing translations

Text translations are defined in `app.js` under the `translations` object. Each key corresponds to a `data‑i18n`, `data‑i18n‑placeholder` or `data‑i18n‑html` attribute in the HTML. To update a translation, modify the relevant string in both the German (`de`) and English (`en`) objects.

## Changing the email target

The mail target address used by the contact form lives in `app.js` inside the `submit` handler for the form. Look for the line starting with:

```js
const mailto = `mailto:hello@example.com?subject=${subject}&body=${body}`;
```

Replace `hello@example.com` with your desired email address. Remember to adjust the visible placeholder in `index.html` at the bottom of the contact section if needed.

## Licence

This project is provided as a template and carries no specific licence. Feel free to adapt it for your own use.
