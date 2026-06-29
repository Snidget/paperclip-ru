# plugin-paperclip-ru

Русская локализация интерфейса для [Paperclip](https://github.com/paperclipai/paperclip).
Плагин добавляет переключатель языка и переводит английские элементы интерфейса Paperclip на русский без изменения исходного кода Paperclip.

## Поддерживаемые языки

- English, режим без перевода
- Русский

## Установка

В Paperclip:

1. Откройте **Instance Settings -> Plugins**.
2. Нажмите **Install Plugin**.
3. Введите имя npm-пакета:

```text
plugin-paperclip-ru
```

4. Нажмите **Install**.

После установки выберите **Русский** в языковом селекторе в верхней панели или на странице настроек плагина.

## Как это работает

Плагин монтирует UI через слоты Paperclip:

- `globalToolbarButton` добавляет компактный селектор языка в верхнюю панель.
- `settingsPage` добавляет страницу настроек языкового пакета.

Для русского языка плагин запускает DOM-переводчик на базе `MutationObserver`. Он заменяет точные английские строки из словаря `src/ui/locales/ru.ts` на русские значения. Также переводятся распространенные текстовые атрибуты: `title`, `aria-label`, `aria-description`, `aria-placeholder`, `placeholder`, `alt` и значения кнопочных `input`.

Выбор языка хранится в `localStorage` браузера.

## Ограничения

- Новые строки Paperclip нужно вручную добавлять в `src/ui/locales/ru.ts`.
- Динамические элементы могут на мгновение появляться на английском до замены.
- Текст внутри изображений, canvas или SVG не переводится.
- Плагин переводит только точные совпадения строк.

## Разработка

```bash
npm install
npm run build
```

Проверка публикационного архива:

```bash
npm publish --dry-run --access public --registry https://registry.npmjs.org
```

Публикация:

```bash
npm publish --access public --registry https://registry.npmjs.org
```

## Структура

```text
plugin-paperclip-ru/
├── package.json
├── scripts/
│   ├── build-worker.mjs
│   └── build-ui.mjs
└── src/
    ├── manifest.ts
    ├── worker.ts
    └── ui/
        ├── LangSwitcher.tsx
        ├── LangSettingsPage.tsx
        ├── domTranslator.ts
        ├── translations.ts
        └── locales/
            ├── registry.ts
            └── ru.ts
```

## Origin

Проект основан на `paperclip-lang` от hinet и адаптирован как отдельный пакет для русской локализации.

## License

MIT
