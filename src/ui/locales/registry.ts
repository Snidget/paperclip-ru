export interface LocaleEntry {
  /** BCP 47 language tag, e.g. "ru" */
  code: string;
  /** Native display name, e.g. "Русский" */
  nativeName: string;
  /** English display name, e.g. "Russian" */
  englishName: string;
  /** Emoji flag for visual identification */
  flag: string;
}

/**
 * Registry of all supported languages.
 *
 * To add a new language:
 * 1. Add an entry here
 * 2. Create a matching locale file at `./locales/<code>.ts`
 * 3. Import and register it in `../translations.ts`
 */
export const LOCALES: LocaleEntry[] = [
  {
    code: "en",
    nativeName: "English",
    englishName: "English",
    flag: "🇺🇸",
  },
  {
    code: "ru",
    nativeName: "Русский",
    englishName: "Russian",
    flag: "🇷🇺",
  },
];

export const DEFAULT_LOCALE = "en";
export const STORAGE_KEY = "paperclip.ru.locale";

export function getCurrentLocale(): string {
  if (typeof localStorage === "undefined") return DEFAULT_LOCALE;
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_LOCALE;
}

export function setCurrentLocale(code: string): void {
  localStorage.setItem(STORAGE_KEY, code);
}
