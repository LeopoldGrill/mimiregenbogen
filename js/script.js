/* ==========================================================================
   Mimi's Rainbow Haven – Vanilla JavaScript
   Module:  1. Jahr im Footer   2. Bild-Fallback   3. Mobile Navigation
            4. Lightbox-Galerie 5. Kontaktformular-Validierung
   Hinweis: Alle Module prüfen selbst, ob die benötigten Elemente auf der
            aktuellen Seite existieren – dieselbe Datei läuft auf allen Seiten.
   ========================================================================== */
(function () {
  'use strict';

  /* ===== 1. Aktuelles Jahr im Footer ===================================== */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ===== 2. Bild-Fallback ===============================================
     Die Tierfotos liegen lokal in img/. Falls ein Bild nicht geladen werden
     kann (fehlende Datei, falscher Pfad), wird ein dezenter Platzhalter als
     SVG eingesetzt, damit kein defektes Bild erscheint. Der alt-Text bleibt
     dabei unverändert erhalten.
     ====================================================================== */
  var PLACEHOLDERS = {
    sheep: placeholderSvg('#e3d5bd', '#7a8b6f', 'Foto folgt'),
    goat:  placeholderSvg('#f1e7d6', '#6b4f3a', 'Foto folgt')
  };

  function placeholderSvg(bg, fg, label) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 640">' +
      '<rect width="800" height="640" fill="' + bg + '"/>' +
      '<g fill="none" stroke="' + fg + '" stroke-width="10" stroke-linecap="round" opacity="0.65">' +
      '<ellipse cx="400" cy="330" rx="150" ry="110"/>' +
      '<circle cx="400" cy="210" r="62"/>' +
      '<path d="M352 170c-26-22-58-18-70 6M448 170c26-22 58-18 70 6"/>' +
      '<path d="M300 430v70M360 440v60M440 440v60M500 430v70"/>' +
      '</g>' +
      '<text x="400" y="578" fill="' + fg + '" font-family="Georgia, serif" ' +
      'font-size="34" text-anchor="middle" opacity="0.8">' + label + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function initImageFallback() {
    document.querySelectorAll('img[data-fallback]').forEach(function (img) {
      var replace = function () {
        var key = img.getAttribute('data-fallback');
        var src = PLACEHOLDERS[key] || PLACEHOLDERS.sheep;
        if (img.src !== src) { img.src = src; }
        img.removeAttribute('data-fallback');
      };
      img.addEventListener('error', replace);
      // Bereits fehlgeschlagene Bilder (Cache/Race-Condition) abfangen
      if (img.complete && img.naturalWidth === 0) { replace(); }
    });
  }

  /* ===== 3. Mobile Navigation ============================================ */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('primaryNav');
    if (!toggle || !nav) { return; }

    var mq = window.matchMedia('(min-width: 53.75em)');

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Nach Klick auf einen Link das Menü schließen
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) { setOpen(false); }
    });

    // Escape schließt das Menü und gibt den Fokus zurück
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Beim Wechsel auf Desktop-Breite den mobilen Zustand zurücksetzen
    mq.addEventListener('change', function (event) {
      if (event.matches) { setOpen(false); }
    });
  }

  /* ===== 4. Lightbox-Galerie ============================================= */
  function initLightbox() {
    var box = document.getElementById('lightbox');
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    if (!box || triggers.length === 0) { return; }

    var image = document.getElementById('lightboxImage');
    var caption = document.getElementById('lightboxCaption');
    var counter = document.getElementById('lightboxCounter');
    var btnClose = document.getElementById('lightboxClose');
    var btnPrev = document.getElementById('lightboxPrev');
    var btnNext = document.getElementById('lightboxNext');
    var controls = [btnClose, btnPrev, btnNext];

    var index = 0;
    var lastFocused = null;
    var BLANK = image.getAttribute('src'); // transparentes 1x1-Pixel aus dem HTML

    function show(i) {
      // Modulo-Rechnung für endloses Blättern in beide Richtungen
      index = (i + triggers.length) % triggers.length;

      var trigger = triggers[index];
      var thumb = trigger.querySelector('img');

      image.src = trigger.getAttribute('data-full') || (thumb ? thumb.src : '');
      image.alt = thumb ? thumb.alt : '';
      caption.textContent = trigger.getAttribute('data-caption') || '';
      counter.textContent = 'Bild ' + (index + 1) + ' von ' + triggers.length;
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.classList.add('has-lightbox');
      btnClose.focus();
    }

    function close() {
      box.hidden = true;
      document.body.classList.remove('has-lightbox');
      image.src = BLANK;
      image.alt = '';
      if (lastFocused && typeof lastFocused.focus === 'function') { lastFocused.focus(); }
    }

    triggers.forEach(function (trigger, i) {
      trigger.addEventListener('click', function () { open(i); });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });

    box.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    // Tastatursteuerung: Escape, Pfeiltasten, Fokus innerhalb des Dialogs halten
    document.addEventListener('keydown', function (event) {
      if (box.hidden) { return; }

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + 1);
      } else if (event.key === 'Tab') {
        // Einfacher Fokus-Trap über die drei Bedienelemente
        event.preventDefault();
        var pos = controls.indexOf(document.activeElement);
        var step = event.shiftKey ? -1 : 1;
        var next = (pos + step + controls.length) % controls.length;
        controls[next].focus();
      }
    });

    // Wischen auf Touch-Geräten
    var touchStartX = null;
    box.addEventListener('touchstart', function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    box.addEventListener('touchend', function (event) {
      if (touchStartX === null) { return; }
      var delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) { show(delta < 0 ? index + 1 : index - 1); }
      touchStartX = null;
    });
  }

  /* ===== 5. Kontaktformular ============================================== */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) { return; }

    var status = document.getElementById('formStatus');
    var counterEl = form.querySelector('[data-char-count]');
    var message = form.elements.message;

    // Macht die Statusmeldung per Skript fokussierbar, damit Screenreader-
    // Nutzer nach dem Absenden direkt zur Rückmeldung springen.
    status.setAttribute('tabindex', '-1');

    /* --- Validierungsregeln je Feld --- */
    var rules = {
      name: function (value) {
        if (!value.trim()) { return 'Bitte geben Sie Ihren Namen an.'; }
        if (value.trim().length < 2) { return 'Der Name ist zu kurz.'; }
        return '';
      },
      email: function (value) {
        if (!value.trim()) { return 'Bitte geben Sie Ihre E-Mail-Adresse an.'; }
        // Bewusst einfache Prüfung: ein @, ein Punkt danach, keine Leerzeichen
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
          return 'Diese E-Mail-Adresse sieht nicht vollständig aus (z. B. name@beispiel.at).';
        }
        return '';
      },
      phone: function (value) {
        if (!value.trim()) { return ''; } // optionales Feld
        if (!/^[+0-9\s/()-]{6,25}$/.test(value.trim())) {
          return 'Bitte nur Ziffern, Leerzeichen und + verwenden.';
        }
        return '';
      },
      topic: function (value) {
        if (!value) { return 'Bitte wählen Sie Ihr Anliegen aus.'; }
        return '';
      },
      visitors: function (value) {
        if (!value.trim()) { return ''; } // optionales Feld
        var n = Number(value);
        if (!Number.isInteger(n) || n < 1 || n > 20) {
          return 'Bitte eine ganze Zahl zwischen 1 und 20 angeben.';
        }
        return '';
      },
      message: function (value) {
        var text = value.trim();
        if (!text) { return 'Bitte schreiben Sie uns ein paar Zeilen.'; }
        if (text.length < 20) {
          return 'Noch ' + (20 - text.length) + ' Zeichen bis zur Mindestlänge.';
        }
        return '';
      },
      privacy: function (value, field) {
        if (!field.checked) { return 'Ohne Ihr Einverständnis dürfen wir die Anfrage nicht bearbeiten.'; }
        return '';
      }
    };

    var fieldNames = Object.keys(rules);

    function errorBox(name) {
      return form.querySelector('[data-error-for="' + name + '"]');
    }

    /* Prüft ein Feld und schreibt bzw. entfernt die Fehlermeldung */
    function validateField(name, showError) {
      var field = form.elements[name];
      var box = errorBox(name);
      if (!field || !box) { return true; }

      var msg = rules[name](field.value, field);

      if (msg && showError) {
        box.textContent = msg;
        box.classList.add('is-visible');
        field.setAttribute('aria-invalid', 'true');
      } else {
        box.textContent = '';
        box.classList.remove('is-visible');
        field.removeAttribute('aria-invalid');
      }
      return !msg;
    }

    function setStatus(text, type) {
      status.textContent = text;
      status.className = 'form__status' + (text ? ' is-visible is-' + type : '');
    }

    /* --- Live-Feedback: beim Verlassen prüfen, beim Tippen Fehler lösen --- */
    fieldNames.forEach(function (name) {
      var field = form.elements[name];
      if (!field) { return; }

      field.addEventListener('blur', function () { validateField(name, true); });

      var liveEvent = (field.type === 'checkbox' || field.tagName === 'SELECT') ? 'change' : 'input';
      field.addEventListener(liveEvent, function () {
        // Eine bereits angezeigte Meldung verschwindet, sobald sie behoben ist
        if (field.getAttribute('aria-invalid') === 'true') { validateField(name, true); }
      });
    });

    /* --- Zeichenzähler für die Nachricht --- */
    if (counterEl && message) {
      message.addEventListener('input', function () {
        counterEl.textContent = String(message.value.trim().length);
      });
    }

    /* --- Absenden --- */
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Demo ohne Server-Anbindung

      var firstInvalid = null;

      fieldNames.forEach(function (name) {
        var ok = validateField(name, true);
        if (!ok && !firstInvalid) { firstInvalid = form.elements[name]; }
      });

      if (firstInvalid) {
        setStatus('Bitte prüfen Sie die rot markierten Felder.', 'error');
        firstInvalid.focus();
        return;
      }

      var name = form.elements.name.value.trim().split(/\s+/)[0];
      setStatus(
        'Danke, ' + name + '! Ihre Nachricht ist bei uns eingegangen. ' +
        'Wir antworten innerhalb von zwei bis drei Tagen.',
        'success'
      );

      form.reset();
      if (counterEl) { counterEl.textContent = '0'; }
      status.focus();
    });
  }

  /* ===== Start ============================================================ */
  function init() {
    initYear();
    initImageFallback();
    initNav();
    initLightbox();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
