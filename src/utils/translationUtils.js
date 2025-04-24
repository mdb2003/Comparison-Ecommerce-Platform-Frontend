/**
 * Translation utilities for internationalizing the application
 */

/**
 * Get translated text for the given key and language code
 * @param {Object} translations - Object with translations for different languages
 * @param {string} langCode - The language code (e.g., 'en', 'es')
 * @param {string} fallbackLang - Fallback language code if translation isn't available
 * @returns {string} The translated text
 */
export const getTranslation = (translations, langCode, fallbackLang = 'en') => {
  // If translations for the language exist, return it
  if (translations[langCode]) {
    return translations[langCode];
  }
  
  // Otherwise return fallback language or first available translation
  return translations[fallbackLang] || Object.values(translations)[0] || '';
};

/**
 * Common translations used across the application
 */
export const commonTranslations = {
  search: {
    en: 'Search',
    es: 'Buscar',
    fr: 'Rechercher',
    de: 'Suchen',
    ar: 'بحث',
    zh: '搜索',
    ja: '検索',
    ru: 'Поиск'
  },
  searchPlaceholder: {
    en: 'Search for products...',
    es: 'Buscar productos...',
    fr: 'Rechercher des produits...',
    de: 'Produkte suchen...',
    ar: 'البحث عن المنتجات...',
    zh: '搜索产品...',
    ja: '製品を検索...',
    ru: 'Поиск товаров...'
  },
  recentSearches: {
    en: 'Recent Searches',
    es: 'Búsquedas Recientes',
    fr: 'Recherches Récentes',
    de: 'Letzte Suchen',
    ar: 'عمليات البحث الأخيرة',
    zh: '最近搜索',
    ja: '最近の検索',
    ru: 'Недавние поиски'
  },
  clearFilters: {
    en: 'Clear Filters',
    es: 'Limpiar Filtros',
    fr: 'Effacer les filtres',
    de: 'Filter löschen',
    ar: 'مسح الفلاتر',
    zh: '清除筛选',
    ja: 'フィルターをクリア',
    ru: 'Очистить фильтры'
  },
  loading: {
    en: 'Loading...',
    es: 'Cargando...',
    fr: 'Chargement...',
    de: 'Laden...',
    ar: 'جار التحميل...',
    zh: '加载中...',
    ja: '読み込み中...',
    ru: 'Загрузка...'
  },
  error: {
    en: 'Error',
    es: 'Error',
    fr: 'Erreur',
    de: 'Fehler',
    ar: 'خطأ',
    zh: '错误',
    ja: 'エラー',
    ru: 'Ошибка'
  },
  tryAgain: {
    en: 'Try Again',
    es: 'Intentar de nuevo',
    fr: 'Réessayer',
    de: 'Erneut versuchen',
    ar: 'حاول مرة أخرى',
    zh: '重试',
    ja: '再試行',
    ru: 'Попробовать снова'
  },
  noProductsFound: {
    en: 'No products found',
    es: 'No se encontraron productos',
    fr: 'Aucun produit trouvé',
    de: 'Keine Produkte gefunden',
    ar: 'لم يتم العثور على منتجات',
    zh: '未找到产品',
    ja: '製品が見つかりません',
    ru: 'Товары не найдены'
  },
  adjustSearchMessage: {
    en: 'Try adjusting your search or filters to find what you\'re looking for.',
    es: 'Intenta ajustar tu búsqueda o filtros para encontrar lo que estás buscando.',
    fr: 'Essayez d\'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.',
    de: 'Versuchen Sie, Ihre Suche oder Filter anzupassen, um zu finden, wonach Sie suchen.',
    ar: 'حاول تعديل البحث أو المرشحات للعثور على ما تبحث عنه.',
    zh: '尝试调整搜索或筛选条件以找到您要查找的内容。',
    ja: '検索条件やフィルターを調整して、お探しのものを見つけてください。',
    ru: 'Попробуйте изменить поисковый запрос или фильтры, чтобы найти то, что вы ищете.'
  },
  errorLoadingProducts: {
    en: 'Error loading products',
    es: 'Error al cargar productos',
    fr: 'Erreur lors du chargement des produits',
    de: 'Fehler beim Laden der Produkte',
    ar: 'خطأ في تحميل المنتجات',
    zh: '加载产品时出错',
    ja: '製品の読み込みエラー',
    ru: 'Ошибка загрузки товаров'
  },
  filters: {
    en: 'Filters',
    es: 'Filtros',
    fr: 'Filtres',
    de: 'Filter',
    ar: 'الفلاتر',
    zh: '筛选',
    ja: 'フィルター',
    ru: 'Фильтры'
  },
  price: {
    en: 'Price',
    es: 'Precio',
    fr: 'Prix',
    de: 'Preis',
    ar: 'السعر',
    zh: '价格',
    ja: '価格',
    ru: 'Цена'
  },
  apply: {
    en: 'Apply',
    es: 'Aplicar',
    fr: 'Appliquer',
    de: 'Anwenden',
    ar: 'تطبيق',
    zh: '应用',
    ja: '適用',
    ru: 'Применить'
  },
  sort: {
    en: 'Sort',
    es: 'Ordenar',
    fr: 'Trier',
    de: 'Sortieren',
    ar: 'ترتيب',
    zh: '排序',
    ja: '並べ替え',
    ru: 'Сортировка'
  },
  rating: {
    en: 'Rating',
    es: 'Valoración',
    fr: 'Évaluation',
    de: 'Bewertung',
    ar: 'التقييم',
    zh: '评分',
    ja: '評価',
    ru: 'Рейтинг'
  },
  store: {
    en: 'Store',
    es: 'Tienda',
    fr: 'Boutique',
    de: 'Laden',
    ar: 'المتجر',
    zh: '商店',
    ja: 'ストア',
    ru: 'Магазин'
  },
  addToCart: {
    en: 'Add to Cart',
    es: 'Añadir al Carrito',
    fr: 'Ajouter au Panier',
    de: 'In den Warenkorb',
    ar: 'أضف إلى السلة',
    zh: '加入购物车',
    ja: 'カートに追加',
    ru: 'В корзину'
  },
  addToWishlist: {
    en: 'Add to Wishlist',
    es: 'Añadir a Favoritos',
    fr: 'Ajouter aux Favoris',
    de: 'Zur Wunschliste hinzufügen',
    ar: 'أضف إلى المفضلة',
    zh: '加入收藏',
    ja: 'お気に入りに追加',
    ru: 'В избранное'
  },
  compare: {
    en: 'Compare',
    es: 'Comparar',
    fr: 'Comparer',
    de: 'Vergleichen',
    ar: 'قارن',
    zh: '比较',
    ja: '比較',
    ru: 'Сравнить'
  },
  // Search Results Page
  resultsFor: {
    en: 'Results for',
    es: 'Resultados para',
    fr: 'Résultats pour',
    de: 'Ergebnisse für',
    ar: 'نتائج البحث عن',
    zh: '搜索结果：',
    ja: '検索結果：',
    ru: 'Результаты для'
  },
  searchingFor: {
    en: 'Searching for',
    es: 'Buscando',
    fr: 'Recherche de',
    de: 'Suche nach',
    ar: 'جاري البحث عن',
    zh: '正在搜索',
    ja: '検索中',
    ru: 'Поиск'
  },
  productsFound: {
    en: 'products found',
    es: 'productos encontrados',
    fr: 'produits trouvés',
    de: 'Produkte gefunden',
    ar: 'منتجات تم العثور عليها',
    zh: '找到产品',
    ja: '製品が見つかりました',
    ru: 'товаров найдено'
  },
  noResults: {
    en: 'No results found',
    es: 'No se encontraron resultados',
    fr: 'Aucun résultat trouvé',
    de: 'Keine Ergebnisse gefunden',
    ar: 'لم يتم العثور على نتائج',
    zh: '未找到结果',
    ja: '結果が見つかりません',
    ru: 'Результатов не найдено'
  },
  gridView: {
    en: 'Grid view',
    es: 'Vista de cuadrícula',
    fr: 'Vue en grille',
    de: 'Rasteransicht',
    ar: 'عرض شبكي',
    zh: '网格视图',
    ja: 'グリッド表示',
    ru: 'Сетка'
  },
  listView: {
    en: 'List view',
    es: 'Vista de lista',
    fr: 'Vue en liste',
    de: 'Listenansicht',
    ar: 'عرض قائمة',
    zh: '列表视图',
    ja: 'リスト表示',
    ru: 'Список'
  },
  sortByRelevance: {
    en: 'Sort by: Relevance',
    es: 'Ordenar por: Relevancia',
    fr: 'Trier par: Pertinence',
    de: 'Sortieren nach: Relevanz',
    ar: 'الترتيب حسب: الصلة',
    zh: '排序方式：相关度',
    ja: '並べ替え：関連性',
    ru: 'Сортировка: По релевантности'
  },
  sortByPriceLow: {
    en: 'Price: Low to High',
    es: 'Precio: De menor a mayor',
    fr: 'Prix: Croissant',
    de: 'Preis: Aufsteigend',
    ar: 'السعر: من الأقل إلى الأعلى',
    zh: '价格：从低到高',
    ja: '価格：安い順',
    ru: 'Цена: По возрастанию'
  },
  sortByPriceHigh: {
    en: 'Price: High to Low',
    es: 'Precio: De mayor a menor',
    fr: 'Prix: Décroissant',
    de: 'Preis: Absteigend',
    ar: 'السعر: من الأعلى إلى الأقل',
    zh: '价格：从高到低',
    ja: '価格：高い順',
    ru: 'Цена: По убыванию'
  },
  sortByRating: {
    en: 'Highest Rated',
    es: 'Mejor valorados',
    fr: 'Mieux notés',
    de: 'Bestbewertet',
    ar: 'الأعلى تقييماً',
    zh: '评分最高',
    ja: '評価の高い順',
    ru: 'По рейтингу'
  },
  andUp: {
    en: 'and up',
    es: 'y superior',
    fr: 'et plus',
    de: 'und höher',
    ar: 'وما فوق',
    zh: '及以上',
    ja: '以上',
    ru: 'и выше'
  },
  
  // Language Settings Page
  languageAndSettings: {
    en: 'Language & Settings',
    es: 'Idioma y Configuración',
    fr: 'Langue et Paramètres',
    de: 'Sprache & Einstellungen',
    ar: 'اللغة والإعدادات',
    zh: '语言和设置',
    ja: '言語と設定',
    ru: 'Язык и настройки'
  },
  customizeExperience: {
    en: 'Customize your browsing experience',
    es: 'Personaliza tu experiencia de navegación',
    fr: 'Personnalisez votre expérience de navigation',
    de: 'Passen Sie Ihr Surferlebnis an',
    ar: 'تخصيص تجربة التصفح الخاصة بك',
    zh: '自定义您的浏览体验',
    ja: 'ブラウジング体験をカスタマイズする',
    ru: 'Настройте свой опыт просмотра'
  },
  selectLanguage: {
    en: 'Select Language',
    es: 'Seleccionar Idioma',
    fr: 'Choisir la Langue',
    de: 'Sprache auswählen',
    ar: 'اختر اللغة',
    zh: '选择语言',
    ja: '言語を選択',
    ru: 'Выбрать язык'
  },
  selectCurrency: {
    en: 'Select Currency',
    es: 'Seleccionar Moneda',
    fr: 'Choisir la Devise',
    de: 'Währung auswählen',
    ar: 'اختر العملة',
    zh: '选择货币',
    ja: '通貨を選択',
    ru: 'Выбрать валюту'
  },
  dateFormat: {
    en: 'Date Format',
    es: 'Formato de Fecha',
    fr: 'Format de Date',
    de: 'Datumsformat',
    ar: 'تنسيق التاريخ',
    zh: '日期格式',
    ja: '日付形式',
    ru: 'Формат даты'
  },
  timeFormat: {
    en: 'Time Format',
    es: 'Formato de Hora',
    fr: 'Format de l\'Heure',
    de: 'Zeitformat',
    ar: 'تنسيق الوقت',
    zh: '时间格式',
    ja: '時間形式',
    ru: 'Формат времени'
  },
  previewSettings: {
    en: 'Preview Your Settings',
    es: 'Vista Previa de tu Configuración',
    fr: 'Aperçu de vos Paramètres',
    de: 'Vorschau Ihrer Einstellungen',
    ar: 'معاينة الإعدادات الخاصة بك',
    zh: '预览您的设置',
    ja: '設定のプレビュー',
    ru: 'Предварительный просмотр настроек'
  },
  languagePreview: {
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
    de: 'Sprache',
    ar: 'اللغة',
    zh: '语言',
    ja: '言語',
    ru: 'Язык'
  },
  currencyPreview: {
    en: 'Currency',
    es: 'Moneda',
    fr: 'Devise',
    de: 'Währung',
    ar: 'العملة',
    zh: '货币',
    ja: '通貨',
    ru: 'Валюта'
  },
  dateTimePreview: {
    en: 'Date & Time',
    es: 'Fecha y Hora',
    fr: 'Date et Heure',
    de: 'Datum & Uhrzeit',
    ar: 'التاريخ والوقت',
    zh: '日期和时间',
    ja: '日付と時刻',
    ru: 'Дата и время'
  }
};

/**
 * FormatJS-like shorthand for translating text
 * @param {string} key - The translation key in dot notation (e.g., 'common.search')
 * @param {string} langCode - The language code
 * @returns {string} Translated text
 */
export const t = (key, langCode = 'en') => {
  const keyParts = key.split('.');
  let translations = commonTranslations;
  
  // Navigate through nested keys
  for (let i = 0; i < keyParts.length - 1; i++) {
    translations = translations[keyParts[i]] || {};
  }
  
  const finalKey = keyParts[keyParts.length - 1];
  
  // If the key exists in translations, return the translation
  if (translations[finalKey]) {
    return getTranslation(translations[finalKey], langCode);
  }
  
  // Fallback to the key itself
  return key;
};

/**
 * Format price based on currency and locale
 * @param {number} price - The price value
 * @param {string} currencyCode - The currency code (e.g., 'USD', 'EUR')
 * @param {string} localeCode - The locale code (e.g., 'en-US', 'fr-FR')
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currencyCode = 'USD', localeCode = 'en-US') => {
  return new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Format date based on locale
 * @param {Date|string} date - The date to format
 * @param {string} localeCode - The locale code (e.g., 'en-US', 'fr-FR')
 * @param {Object} options - Options for Intl.DateTimeFormat
 * @returns {string} Formatted date
 */
export const formatDate = (date, localeCode = 'en-US', options = { dateStyle: 'medium' }) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(localeCode, options).format(dateObj);
};

/**
 * Check if the given language code is RTL (Right-to-Left)
 * @param {string} langCode - The language code to check
 * @returns {boolean} True if RTL, false otherwise
 */
export const isRTL = (langCode) => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(langCode);
};

/**
 * Get language metadata by language code
 * @param {string} langCode - The language code
 * @returns {Object} Language metadata including name, native name, and flag
 */
export const getLanguageInfo = (langCode) => {
  const languages = {
    en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', rtl: true },
    he: { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true },
    ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  };
  
  return languages[langCode] || languages.en;
}; 