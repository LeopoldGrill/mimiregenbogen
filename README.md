# Mimi's Rainbow Haven – Lebenshof für Schafe & Ziegen

Statische, barrierefreie Website für einen fiktiven Lebenshof, auf dem gerettete Schafe und
Ziegen dauerhaft leben dürfen. Umgesetzt mit **HTML5, CSS3 und Vanilla JavaScript** – ohne
Framework, ohne Build-Schritt, ohne Abhängigkeiten. Die Seite kann direkt per Doppelklick
geöffnet oder unverändert über GitHub Pages veröffentlicht werden.

---

## Inhaltsverzeichnis

1. [Projektbeschreibung](#1-projektbeschreibung)
2. [Verwendete Technologien](#2-verwendete-technologien)
3. [Ordnerstruktur](#3-ordnerstruktur)
4. [Seitenübersicht & Funktionen](#4-seitenübersicht--funktionen)
5. [Barrierefreiheit](#5-barrierefreiheit)
6. [Designsystem](#6-designsystem)
7. [Lokal starten](#7-lokal-starten)
8. [Deployment über GitHub Pages](#8-deployment-über-github-pages)
9. [Platzhalter, die noch ersetzt werden müssen](#9-platzhalter-die-noch-ersetzt-werden-müssen)
10. [Kontaktformular an einen Server anbinden](#10-kontaktformular-an-einen-server-anbinden)
11. [Validierung & Tests](#11-validierung--tests)

---

## 1. Projektbeschreibung

Mimi's Rainbow Haven ist ein Lebenshof: Tiere, die hier ankommen, bleiben für immer – keine
Zucht, keine Vermittlung, keine Schlachtung. Die Website hat drei Aufgaben:

- **emotional erreichen** – über ein großes Titelbild und persönliche Tiergeschichten
- **informieren** – Entstehungsgeschichte, Standort, Besuchszeiten, Hofgrundsätze
- **zum Handeln bringen** – Patenschaften, Spenden, Sachspenden und Ehrenamt

Die Inhalte sind realistische Beispieltexte für ein Hochschulprojekt und beschreiben keinen
real existierenden Verein.

---

## 2. Verwendete Technologien

| Technologie | Einsatz im Projekt |
|---|---|
| **HTML5** | Durchgängig semantische Struktur: `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `address`, `footer`, `dl` für Steckbriefe |
| **CSS3** | Externes Stylesheet, Mobile First, **Flexbox** (Header, Buttons, Listen) und **CSS Grid** (alle Raster und zweispaltigen Layouts) |
| **CSS Custom Properties** | Zentrale Design-Tokens für Farben, Abstände, Radien und Schatten in `:root` |
| **Vanilla JavaScript (ES5-kompatibel)** | Mobile Navigation, Lightbox-Galerie, Formularvalidierung, Bild-Fallback, Jahr im Footer – in einer IIFE, ohne globale Variablen |
| **Media Queries** | Breakpoints bei 600 px, 860 px, 1100 px sowie `prefers-reduced-motion`, `forced-colors` und ein Print-Stylesheet |
| **Wikimedia Commons** | Frei lizenzierte Platzhalterfotos von Schafen und Ziegen, lokal in `img/` abgelegt (Nachweis in [`img/CREDITS.md`](img/CREDITS.md)) |

**Keine** externen Bibliotheken, keine Web-Fonts, kein CDN, kein npm – die Seite funktioniert
vollständig offline. Alle drei Seiten sind mit dem
[W3C-Validator](https://validator.w3.org/) und das Stylesheet mit dem
[CSS-Validator](https://jigsaw.w3.org/css-validator/) geprüft: **0 Fehler, 0 Warnungen**.

---

## 3. Ordnerstruktur

```
Website/
├── index.html          # Startseite: Hero, Einführung, Mission, Tier-Teaser, CTA
├── ueber-uns.html      # Entstehungsgeschichte, Standort, Kontaktformular
├── tiere.html          # 6 Tier-Steckbriefe mit Lightbox + Unterstützungsbereich
├── css/
│   └── style.css       # Komplettes Stylesheet (Mobile First, kommentierte Abschnitte)
├── js/
│   └── script.js       # Navigation, Lightbox, Validierung, Bild-Fallback
├── img/                # Platzhalterfotos (Wikimedia Commons) + Lizenznachweis
│   ├── hof-hero.jpg    #   Titelbild der Startseite
│   ├── weide.jpg       #   Schafporträt im Einführungsabschnitt
│   ├── hofalltag.jpg   #   Ziege in der Infobox auf „Über uns“
│   ├── mimi.jpg        #   Steckbrieffotos der sechs Tiere …
│   ├── fritzi.jpg
│   ├── rosa.jpg
│   ├── hugo.jpg
│   ├── pauline.jpg
│   ├── nemo.jpg
│   └── CREDITS.md      #   Urheber:in und Lizenz je Datei
├── .nojekyll           # Verhindert Jekyll-Verarbeitung auf GitHub Pages
└── README.md           # Diese Datei
```

---

## 4. Seitenübersicht & Funktionen

### `index.html` – Startseite

- **Hero-Bereich** mit vollflächigem Titelbild, Gradient-Overlay für garantierte Lesbarkeit
  und zwei Handlungsaufrufen
- **Emotionale Einführung** in den Hof (zweispaltig ab 860 px, Bild mit leichter Drehung)
- **Mission** in drei Karten: *Aufnehmen – Bleiben lassen – Sichtbar machen* (Inline-SVG-Icons)
- **Zahlenband** auf dunkelgrünem Grund (Tiere, Gründungsjahr, Fläche, Ehrenamt)
- **Tier-Teaser** mit Hover-Zoom, verlinkt direkt auf die Steckbrief-Anker
- **Call-to-Action-Band** mit konkreten Kosten (Heuballen, Hufpflege, Winter pro Schaf)

### `ueber-uns.html` – Über uns & Kontakt

- **Entstehungsgeschichte** als zusammenhängender Erzähltext mit Infokarte („Auf einen Blick“)
- **Standortbereich** mit Adresse, Besuchszeiten, Direktkontakt und Button zu
  [Google Maps](https://maps.app.goo.gl/F7PwFQZy1q6itz8a9) (`target="_blank"` + `rel="noopener"`
  und Screenreader-Hinweis „öffnet in einem neuen Tab“)
- **Kontaktformular** mit sieben Feldern:
  - `text` (Name), `email`, `tel`, `number` (Personenanzahl), `select` (Anliegen),
    `textarea` (Nachricht), `checkbox` (Einverständnis)
  - Auswahlfeld „Mein Anliegen“: *Besuch / Hofführung, Spende, Tierpatenschaft,
    Ehrenamt / Mithilfe, Tierabgabe / Notfall, Sonstiges*
  - jedes Feld mit eigenem `<label for="…">`, Hinweistexten über `aria-describedby`
    und eigenem Fehlercontainer
  - clientseitige Validierung: Prüfung bei `blur`, Fehler verschwinden beim Korrigieren,
    beim Absenden springt der Fokus auf das erste fehlerhafte Feld
  - Live-Zeichenzähler für die Nachricht (Mindestlänge 20 Zeichen)
  - Statusmeldung über `role="status"` / `aria-live="polite"`

### `tiere.html` – Unsere Tiere & Unterstützung

- **Sechs Steckbriefe** (Mimi, Fritzi, Rosa, Hugo, Pauline, Nemo) im responsiven Grid:
  1 Spalte mobil → 2 Spalten ab 600 px → 3 Spalten ab 1100 px. Jede Karte enthält Foto,
  Namen, optionales Tag („blind“, „Seniorin“, „Ausbrecher“), eine Faktenliste als `<dl>`
  (Art, Alter, bei uns seit, Charakter) und die Rettungsgeschichte.
- **Lightbox-Galerie in Vanilla JS**: Jedes Foto sitzt in einem `<button>` – damit ist es
  auch per Tastatur erreichbar. Die Lightbox ist ein `role="dialog"` mit `aria-modal="true"`
  und bietet:
  - Blättern per Buttons, **Pfeiltasten** und **Wischgeste** (endlos in beide Richtungen)
  - Schließen per **Escape**, Schließen-Button oder Klick auf den Hintergrund
  - **Fokus-Trap** innerhalb des Dialogs, Fokus-Rückgabe auf das auslösende Bild
  - Bildzähler („Bild 2 von 6“) als `aria-live`-Region
  - Scroll-Sperre der Seite, solange die Lightbox offen ist
  - zusätzlich CSS-Hover-Effekte: Zoom des Fotos und eingeblendetes Lupen-Symbol
- **Unterstützungsbereich** (`#unterstuetzen`) mit vier Karten: Tierpatenschaft (drei
  Beitragsstufen, hervorgehoben), Geldspende mit Bankdaten, Sachspenden-Wunschliste und
  Ehrenamt/Hoftag.

### Auf allen Seiten

- identischer Sticky-Header mit Inline-SVG-Regenbogen-Logo und aktiver Seitenmarkierung
  über `aria-current="page"`
- Mobile-Menü-Button (`aria-expanded` / `aria-controls`), der ab 860 px ausgeblendet wird
- Sprunglink „Zum Hauptinhalt springen“, der nur bei Tastaturfokus erscheint
- dreispaltiger Footer mit Navigation, Adresse und automatisch aktualisiertem Jahr
- **Bild-Fallback**: Lässt sich ein Foto nicht laden (fehlende Datei, falscher Pfad),
  setzt `js/script.js` automatisch eine dezente SVG-Illustration ein, statt ein defektes
  Bild zu zeigen – der `alt`-Text bleibt dabei erhalten

---

## 5. Barrierefreiheit

- **Semantik zuerst**: Landmarks (`header`, `nav`, `main`, `footer`), korrekte
  Überschriftenhierarchie ohne Sprünge, Listen für Aufzählungen, `<dl>` für Steckbriefe
- **Aussagekräftige `alt`-Texte** für jedes Bild (beschreiben das Tier und die Situation,
  keine Füllwörter wie „Bild von“); dekorative SVG-Icons sind mit `aria-hidden="true"`
  ausgenommen
- **Tastaturbedienung** vollständig möglich: sichtbare Fokusringe über `:focus-visible`
  (3 px Terracotta, 3 px Offset), Lightbox mit Fokus-Trap und -Rückgabe, Escape schließt
  Menü und Dialog
- **Farbkontraste** nach WCAG 2.1 AA geprüft, z. B.
  `#2f2a24` auf `#fbf7f0` ≈ **13,3:1**, `#5b5349` auf `#fbf7f0` ≈ **6,4:1**,
  `#46543c` auf `#fbf7f0` ≈ **7,4:1**, Weiß auf `#b4533a` ≈ **4,8:1**;
  der Hero-Text liegt auf einem Gradient-Overlay statt direkt auf dem Foto
- **Touch- und Klickflächen** mindestens 44–48 px hoch
- **Formular**: sichtbare Labels (keine Platzhalter als Ersatz), `aria-required`,
  `aria-invalid`, Fehlermeldungen in Textform statt nur über Farbe, Statusmeldung als
  Live-Region
- **`prefers-reduced-motion`**: alle Animationen und Transitions werden abgeschaltet
- **`forced-colors`**: Rahmen bleiben im Windows-Kontrastmodus sichtbar
- `lang="de"` auf `<html>`, Viewport-Meta ohne `user-scalable=no` (Zoom bleibt erlaubt)

---

## 6. Designsystem

Alle Werte sind als CSS-Variablen in `css/style.css` (`:root`) hinterlegt und damit an einer
Stelle austauschbar.

| Variable | Wert | Verwendung |
|---|---|---|
| `--c-cream` | `#fbf7f0` | Seitenhintergrund |
| `--c-beige` / `--c-beige-dark` | `#f1e7d6` / `#e3d5bd` | Abwechselnde Sektionen, Karten, Tags |
| `--c-sage` / `--c-sage-dark` | `#7a8b6f` / `#46543c` | Salbeigrün für Akzente, Zahlenband, Patenschaftskarte |
| `--c-brown` / `--c-brown-dark` | `#6b4f3a` / `#4a3627` | Überschriften, CTA-Band |
| `--c-terracotta` | `#b4533a` | Primäre Buttons, Links, Fokusring |
| `--c-amber` | `#dba44f` | Highlights auf dunklem Grund |

**Typografie:** Georgia (Serif) für Überschriften, System-Sans für Fließtext – beides
systemseitig vorhanden, daher keine Web-Font-Ladezeit. Größen skalieren mit `clamp()`.

**Breakpoints:** `37.5em` (600 px) · `53.75em` (860 px) · `68.75em` (1100 px)

---

## 7. Lokal starten

Die Seite braucht keinen Build-Schritt. Einfachster Weg:

```bash
# Variante A: Datei direkt öffnen
open index.html          # macOS   (Windows: start index.html)
```

Empfohlen ist ein lokaler Webserver, damit Pfade und `fetch`-Verhalten dem späteren
Hosting entsprechen:

```bash
# Variante B: Python (vorinstalliert auf macOS/Linux)
python3 -m http.server 8000
# → http://localhost:8000

# Variante C: Node.js
npx serve .
```

---

## 8. Deployment über GitHub Pages

### Schritt 1 – Repository anlegen

Auf [github.com/new](https://github.com/new) ein Repository erstellen, z. B.
`mimis-rainbow-haven`. **Public** wählen (GitHub Pages ist für private Repos nur in
bezahlten Plänen verfügbar). Keine README/`.gitignore` hinzufügen – die Dateien kommen
lokal mit.

### Schritt 2 – Projekt lokal versionieren

Im Projektordner (dort, wo `index.html` liegt):

```bash
git init
git add .
git commit -m "Website für Mimi's Rainbow Haven"
```

### Schritt 3 – Mit GitHub verbinden und hochladen

```bash
git branch -M main
git remote add origin https://github.com/<BENUTZERNAME>/mimis-rainbow-haven.git
git push -u origin main
```

`<BENUTZERNAME>` durch den eigenen GitHub-Namen ersetzen.

### Schritt 4 – GitHub Pages aktivieren

1. Im Repository auf **Settings** klicken
2. in der linken Seitenleiste **Pages** öffnen
3. unter *Build and deployment → Source* **„Deploy from a branch“** wählen
4. als Branch **`main`** und als Ordner **`/ (root)`** auswählen
5. **Save** klicken

### Schritt 5 – Seite aufrufen

Nach ca. 1–3 Minuten ist die Seite erreichbar unter:

```
https://<BENUTZERNAME>.github.io/mimis-rainbow-haven/
```

Den Fortschritt des Deployments zeigt der Tab **Actions** im Repository. Jeder weitere
`git push` auf `main` veröffentlicht automatisch die neue Version.

### Schritt 6 (optional) – Eigene Domain

1. Beim Domain-Anbieter einen `CNAME`-Eintrag auf `<BENUTZERNAME>.github.io` setzen
   (bei Apex-Domains stattdessen die vier GitHub-`A`-Records)
2. In *Settings → Pages → Custom domain* die Domain eintragen und speichern
3. **Enforce HTTPS** aktivieren, sobald das Zertifikat ausgestellt ist

### Wichtige Hinweise

- Die Datei **`.nojekyll`** liegt bereits im Projekt. Sie verhindert, dass GitHub Pages die
  Dateien durch Jekyll schickt – sonst würden Ordner, die mit `_` beginnen, ignoriert.
- Alle internen Links sind **relativ** (`css/style.css`, `tiere.html`), daher funktioniert
  die Seite sowohl in einem Unterordner-Repo als auch auf einer eigenen Domain.
- Dateinamen sind kleingeschrieben und ohne Umlaute (`ueber-uns.html`), weil der
  GitHub-Pages-Server im Gegensatz zu macOS zwischen Groß- und Kleinschreibung unterscheidet.

---

## 9. Platzhalter, die noch ersetzt werden müssen

Vor einem echten Livegang bitte austauschen:

| Stelle | Platzhalter |
|---|---|
| Alle Tierfotos | Dateien in `img/` durch eigene Hoffotos ersetzen (Dateinamen beibehalten → keine HTML-Änderung nötig) |
| `alt`-Texte | Bei neuen Fotos müssen die Bildbeschreibungen mit angepasst werden |
| `ueber-uns.html`, Footer | E-Mail `hallo@mimis-rainbow-haven.at` |
| `ueber-uns.html`, Footer | Telefonnummer `+43 664 123 456 789` |
| `ueber-uns.html` | Besucheradresse (steht aktuell als „auf Anfrage“) |
| `tiere.html` | IBAN `AT00 0000 0000 0000 0000` |
| `ueber-uns.html` | Formular-`action` (siehe nächster Abschnitt) |
| – | Impressum und Datenschutzerklärung ergänzen (in Österreich/DE rechtlich erforderlich) |

Wenn eigene Fotos verwendet werden: Bilder vorher auf max. 1600 px Breite skalieren und als
WebP oder JPEG exportieren. Danach können sowohl das `data-fallback`-Attribut als auch der
Bildnachweis im Footer entfallen. Wichtig: Die `width`/`height`-Attribute im HTML auf die
tatsächlichen Maße anpassen – sie verhindern das Springen des Layouts beim Laden.

---

## 10. Kontaktformular an einen Server anbinden

GitHub Pages hostet nur statische Dateien und kann keine Formulare verarbeiten. Die
Validierung läuft daher rein im Browser, das Absenden wird mit `preventDefault()`
abgefangen und nur simuliert. Für echten Versand genügt ein Drittanbieter-Endpunkt, z. B.
[Formspree](https://formspree.io/):

```html
<!-- in ueber-uns.html -->
<form class="form" id="contactForm" action="https://formspree.io/f/DEIN-CODE" method="post" novalidate>
```

Zusätzlich in `js/script.js` am Ende des `submit`-Handlers das `event.preventDefault()`
entfernen bzw. `form.submit()` aufrufen, sobald die Validierung erfolgreich war. Die
Feldnamen (`name`, `email`, `phone`, `topic`, `visitors`, `message`, `privacy`) werden
dabei unverändert übertragen.

---

## 11. Validierung & Tests

Empfohlene Prüfschritte vor dem Abgeben bzw. Veröffentlichen:

- **HTML:** [validator.w3.org](https://validator.w3.org/) – alle drei Seiten einzeln prüfen
- **CSS:** [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)
- **Barrierefreiheit:** Lighthouse (Chrome DevTools) und
  [WAVE](https://wave.webaim.org/)
- **Kontraste:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Tastaturtest:** Die Seite einmal komplett nur mit `Tab`, `Enter`, `Leertaste`,
  `Escape` und den Pfeiltasten bedienen – inklusive Menü, Lightbox und Formular
- **Responsivität:** 360 px, 768 px, 1280 px und 1920 px Breite testen

---

## Lizenz & Credits

Code für ein Hochschulprojekt, frei verwendbar.

Die eingebundenen Platzhalterfotos stammen von
[Wikimedia Commons](https://commons.wikimedia.org/) und stehen unter CC-BY-SA-Lizenzen.
Urheber:in, Lizenz und Quelllink sind je Datei in [`img/CREDITS.md`](img/CREDITS.md)
dokumentiert und im Footer der Website verlinkt. Wer die Bilder weiterverwendet, muss diese
Angaben mitführen. Die Fotos zeigen nicht die im Text beschriebenen Tiere – Mimi, Fritzi,
Rosa, Hugo, Pauline und Nemo sind erfundene Beispielprofile.
