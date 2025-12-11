// === i18n / language module ==========================================
(function (global, doc) {
  'use strict';

  // Supported languages
  var SUPPORTED = ['en', 'ru'];

  function normalizeLang(code) {
    if (!code) return 'en';
    code = String(code).toLowerCase();
    if (code.indexOf('-') !== -1) code = code.split('-')[0];
    return SUPPORTED.indexOf(code) !== -1 ? code : 'en';
  }

  function getLangFromQuery() {
    var m = global.location.search.match(/[?&]lang=([a-zA-Z\-]+)/);
    return m ? m[1] : null;
  }

  function getLangFromStorage() {
    try {
      return localStorage.getItem('cubik_lang');
    } catch (e) {
      return null;
    }
  }

  function saveLangToStorage(lang) {
    try {
      localStorage.setItem('cubik_lang', lang);
    } catch (e) {
      // localStorage недоступен
    }
  }

  // Приоритет: URL параметр > localStorage > браузер > по умолчанию EN
  var currentLang = normalizeLang(
    getLangFromQuery() ||
    getLangFromStorage() ||
    (navigator.language || navigator.userLanguage) ||
    'en'
  );

  // Обновляем атрибуты html
  function updateHtmlLang() {
    try {
      doc.documentElement.setAttribute('lang', currentLang);
      doc.documentElement.setAttribute('data-lang', currentLang);
    } catch (e) {}
  }
  updateHtmlLang();

  // ===========================================
  // Словари переводов
  // ===========================================
  var DICT = {
    en: {
      // Общие
      'app.title': '3D Builder',
      'loader.loading': 'Loading Cubiks...',

      // Модальное окно помощи
      'help.title': 'Quick start',
      'help.navigation': 'Navigation',
      'help.controls': 'Controls',
      'help.btn': 'Help',
      'help.start': 'Start',
      'help.close': 'Close',

      // Инструкции навигации
      'help.lmb.rotate': 'Hold LMB — rotate',
      'help.rmb.pan': 'Hold RMB — pan',
      'help.wheel.zoom': 'Mouse wheel — zoom',
      'help.lmb.add': 'Add Cubik',
      'help.rmb.delete': 'Delete Cubik',
      'help.tab.replace': 'Replace/Repaint facets',
      'help.undo': 'Ctrl+Z / Ctrl+Y — Undo / Redo',
      'help.copy': 'Copy Cubik',
      'help.orbit': 'Orbit camera around pivot',
      'help.move': 'Move up/down',
      'help.close': 'Close editor / overlays',

      // HUD (верхняя панель)
      'hud.load': 'Load',
      'hud.save': 'Save',
      'hud.cubiks': 'Cubiks',
      'hud.cubiksLabel': 'Cubiks in scene',

      // Навигация (боковое меню)
      'nav.home': 'Home',
      'nav.shop': 'Shop',
      'nav.about': 'About us',
      'nav.faq': 'FAQ',
      'nav.gallery': 'Gallery',
      'nav.video': 'Video',
      'nav.blog': 'Blog',
      'nav.partnership': 'Partnership',
      'nav.contacts': 'Contacts',

      // Редактор блоков
      'editor.title': 'Block Editor',
      'editor.hint': 'Select the facets you want to replace, pick a color in the palette, choose replacement type — then apply.',
      'editor.preview': 'Edited cubik preview',
      'editor.noSelection': 'No cubik selected',
      'editor.replace': 'Replace facets',

      // Экспорт / Импорт
      'export.scene': 'Export scene',
      'export.stats': 'Export stats',

      // Проекты
      'project.save': 'Save project',
      'project.load': 'Load project',
      'project.name': 'Project name',
      'project.cancel': 'Cancel',
      'project.saveBtn': 'Save',
      'project.modalTitle': 'Save project',

      // Статистика
      'stats.blocks': 'Blocks',
      'stats.facets': 'Facets',

      // Статусы
      'status.ready': 'Ready.',
      'status.loading': 'Loading...',
      'status.saved': 'Saved!',
      'status.error': 'Error',

      // Панель статистики граней
      'facetStats.title': '📊',
      'facetStats.empty': '—',
      'facetStats.collapse': 'Collapse',
      'facetStats.expand': 'Expand'
    },

    ru: {
      // Общие
      'app.title': 'Здесь можно собирать Cubiks',
      'loader.loading': 'Загрузка Cubiks...',

      // Модальное окно помощи
      'help.title': 'Быстрый старт',
      'help.navigation': 'Навигация',
      'help.controls': 'Управление',
      'help.btn': 'Помощь',
      'help.start': 'Начать',
      'help.close': 'Закрыть',

      // Инструкции навигации
      'help.lmb.rotate': 'Зажать ЛКМ — вращение',
      'help.rmb.pan': 'Зажать ПКМ — перемещение',
      'help.wheel.zoom': 'Колесо мыши — масштаб',
      'help.lmb.add': 'Добавить Cubik',
      'help.rmb.delete': 'Удалить Cubik',
      'help.tab.replace': 'Заменить/перекрасить грани',
      'help.undo': 'Ctrl+Z / Ctrl+Y — Отмена / Повтор',
      'help.copy': 'Копировать Cubik',
      'help.orbit': 'Вращение камеры вокруг центра',
      'help.move': 'Движение вверх/вниз',
      'help.close': 'Закрыть редактор / оверлеи',

      // HUD (верхняя панель)
      'hud.load': 'Загрузить',
      'hud.save': 'Сохранить',
      'hud.cubiks': 'Кубики',
      'hud.cubiksLabel': 'Кубики в сцене',

      // Навигация (боковое меню)
      'nav.home': 'Главная',
      'nav.shop': 'Магазин',
      'nav.about': 'О нас',
      'nav.faq': 'FAQ',
      'nav.gallery': 'Галерея',
      'nav.video': 'Видео',
      'nav.blog': 'Блог',
      'nav.partnership': 'Партнёрство',
      'nav.contacts': 'Контакты',

      // Редактор блоков
      'editor.title': 'Редактор блоков',
      'editor.hint': 'Выберите грани для замены, укажите цвет в палитре, выберите тип замены — затем примените.',
      'editor.preview': 'Предпросмотр кубика',
      'editor.noSelection': 'Кубик не выбран',
      'editor.replace': 'Заменить грани',

      // Экспорт / Импорт
      'export.scene': 'Экспорт сцены',
      'export.stats': 'Экспорт статистики',

      // Проекты
      'project.save': 'Сохранить проект',
      'project.load': 'Загрузить проект',
      'project.name': 'Название проекта',
      'project.cancel': 'Отмена',
      'project.saveBtn': 'Сохранить',
      'project.modalTitle': 'Сохранение проекта',

      // Статистика
      'stats.blocks': 'Блоки',
      'stats.facets': 'Грани',

      // Статусы
      'status.ready': 'Готово.',
      'status.loading': 'Загрузка...',
      'status.saved': 'Сохранено!',
      'status.error': 'Ошибка',

      // Панель статистики граней
      'facetStats.title': '📊',
      'facetStats.empty': '—',
      'facetStats.collapse': 'Свернуть',
      'facetStats.expand': 'Развернуть'
    }
  };

  // ===========================================
  // Функция перевода
  // ===========================================
  function t(key, fallback) {
    var pack = DICT[currentLang] || DICT.en;
    if (pack && Object.prototype.hasOwnProperty.call(pack, key)) {
      return pack[key];
    }
    if (DICT.en && Object.prototype.hasOwnProperty.call(DICT.en, key)) {
      return DICT.en[key];
    }
    return fallback !== undefined ? fallback : key;
  }

  // ===========================================
  // Применение переводов к DOM
  // ===========================================
  function apply() {
    // Обновляем <title>
    var titleEl = doc.querySelector('title[data-i18n-key]');
    if (titleEl) {
      titleEl.textContent = t(titleEl.getAttribute('data-i18n-key'));
    }

    // Обновляем все элементы с data-i18n-key
    var nodes = doc.querySelectorAll('[data-i18n-key]');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var key = node.getAttribute('data-i18n-key');
      if (!key) continue;

      var value = t(key);
      var attrName = node.getAttribute('data-i18n-attr');

      if (attrName) {
        // Применяем к указанному атрибуту
        node.setAttribute(attrName, value);
      } else {
        // Применяем к textContent
        node.textContent = value;
      }
    }

    // Обновляем placeholder'ы
    var placeholders = doc.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var ph = placeholders[j];
      var phKey = ph.getAttribute('data-i18n-placeholder');
      if (phKey) {
        ph.setAttribute('placeholder', t(phKey));
      }
    }

    // Вызываем событие для уведомления других модулей
    try {
      var event = new CustomEvent('i18n:applied', { detail: { lang: currentLang } });
      doc.dispatchEvent(event);
    } catch (e) {
      // Fallback для старых браузеров
    }
  }

  // ===========================================
  // Установка языка
  // ===========================================
  function setLang(lang, saveToStorage) {
    var next = normalizeLang(lang);
    if (next === currentLang) return currentLang;

    currentLang = next;
    updateHtmlLang();

    if (saveToStorage !== false) {
      saveLangToStorage(currentLang);
    }

    apply();

    // Вызываем событие смены языка
    try {
      var event = new CustomEvent('i18n:langChanged', { detail: { lang: currentLang } });
      doc.dispatchEvent(event);
    } catch (e) {}

    return currentLang;
  }

  // ===========================================
  // Получение списка доступных языков
  // ===========================================
  function getSupported() {
    return SUPPORTED.slice();
  }

  // ===========================================
  // Добавление переводов динамически
  // ===========================================
  function addTranslations(lang, translations) {
    if (!DICT[lang]) {
      DICT[lang] = {};
      if (SUPPORTED.indexOf(lang) === -1) {
        SUPPORTED.push(lang);
      }
    }
    for (var key in translations) {
      if (Object.prototype.hasOwnProperty.call(translations, key)) {
        DICT[lang][key] = translations[key];
      }
    }
  }

  // ===========================================
  // Публичный API
  // ===========================================
  global.CubikI18N = {
    get lang() {
      return currentLang;
    },
    get supported() {
      return getSupported();
    },
    t: t,
    apply: apply,
    setLang: setLang,
    getSupported: getSupported,
    addTranslations: addTranslations
  };

  // Применяем переводы после загрузки DOM
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', apply);
  } else {
    // DOM уже загружен
    apply();
  }

})(window, document);
// === End i18n / language module ====================================
