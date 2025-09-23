# Biuro Rachunkowe - Responsywna strona z routingiem SPA

Profesjonalna strona internetowa biura rachunkowego z nowoczesnym designem, responsywnym layoutem i Single Page Application (SPA) routingiem.

## 🌟 Funkcjonalności

### ✅ Strona główna
- Sekcja hero z głównym hasłem "KSIĘGOWOŚĆ Z PASJĄ"
- Przegląd usług biura rachunkowego
- Sekcja "O NAS" z informacjami o zespole
- Galeria "TWOJA PASJA = NASZA SIŁA"
- Sekcja blog z mapą lokalizacji

### ✅ Podstrony
- **O NAS** - szczegółowe informacje o firmie i zespole
- **OFERTA** - kompleksowy przegląd usług księgowych
- **TWOJA PASJA = NASZA SIŁA** - galeria zainteresowań zespołu
- **BLOG** - artykuły i aktualności
- **KONTAKT** - formularz kontaktowy i dane firmy

### ✅ Funkcjonalności techniczne
- **SPA Routing** - nawigacja bez przeładowania strony
- **Responsywny design** - dostosowanie do wszystkich urządzeń
- **Mobilne menu** - hamburger menu dla urządzeń mobilnych
- **Animacje** - płynne przejścia i efekty scroll
- **Walidacja formularzy** - sprawdzanie poprawności danych
- **Loading screen** - ekran ładowania aplikacji

## 🚀 Struktura projektu

```
biuro-rachunkowe/
├── index.html              # Główny plik HTML
├── assets/
│   ├── css/
│   │   └── style.css       # Główne style CSS
│   ├── js/
│   │   └── script.js       # JavaScript z routingiem SPA
│   └── images/             # Folder na zdjęcia
└── README.md               # Dokumentacja projektu
```

## 💻 Technologie

- **HTML5** - semantyczna struktura
- **CSS3** - responsywny design, Grid, Flexbox
- **JavaScript ES6+** - SPA routing, animacje, interaktywność
- **Font Awesome** - ikony
- **Google Fonts** - czcionka Inter

## 📱 Responsywność

Strona jest w pełni responsywna i dostosowana do:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)  
- **Mobile** (do 767px)

### Breakpointy
- `768px` - przejście na mobilne menu
- `480px` - dodatkowe optymalizacje dla małych ekranów

## 🎨 Design

### Kolorystyka
- **Główny kolor** - `#2c3e50` (ciemny niebieski)
- **Akcent** - `#c8996b` (złoty/brązowy)
- **Tło** - `#f8f9fa` (jasny szary)
- **Tekst** - `#333333` (ciemny szary)

### Typografia
- **Czcionka główna** - Inter (Google Fonts)
- **Wagi** - 300, 400, 500, 600, 700

## ⚙️ Jak uruchomić

1. **Projekt znajduje się w** folderze `/Users/tomasz/projects/liczydelko/`

2. **Otwórz w przeglądarce**
   ```bash
   # Opcja 1: Bezpośrednio otwórz index.html w przeglądarce
   
   # Opcja 2: Użyj lokalnego serwera (zalecane)
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (jeśli masz zainstalowane)
   npx http-server
   ```

3. **Otwórz przeglądarkę** i przejdź do `http://localhost:8000`

## 🧩 Komponenty JavaScript

### Router
```javascript
const router = new Router();
router.navigate('about'); // Przejdź do sekcji O NAS
```

### FormHandler  
- Walidacja formularzy
- Obsługa wysyłania wiadomości

### ScrollEffects
- Efekty przewijania
- Zmiany w nawigacji podczas scroll

### IntersectionAnimations
- Animacje pojawiania się elementów
- Optymalizacja wydajności

## 📋 Lista sekcji

1. **home** - Strona główna (domyślna)
2. **about** - O nas  
3. **offer** - Oferta
4. **passion** - Twoja pasja = Nasza siła
5. **blog** - Blog
6. **contact** - Kontakt

## 🔧 Kustomizacja

### Zmiana kolorów
Edytuj zmienne w `style.css`:
```css
:root {
  --primary-color: #2c3e50;
  --accent-color: #c8996b;
  --bg-color: #f8f9fa;
}
```

### Dodanie nowej sekcji
1. Dodaj sekcję w HTML z odpowiednim `id`
2. Zarejestruj route w JavaScript:
```javascript
router.registerRoute('new-section', () => router.showSection('new-section'));
```
3. Dodaj link w nawigacji z `data-section="new-section"`

## 🌐 Kompatybilność przeglądarek

- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 11+
- ✅ Edge 79+

## 📞 Kontakt w projekcie

- **Telefon**: +48 123 456 789
- **Email**: kontakt@biuro-rachunkowe.pl
- **Adres**: ul. Przykładowa 123, 00-001 Warszawa

## 🚀 Dalszy rozwój

Możliwości rozszerzenia:
- Integracja z CMS (Strapi, WordPress)
- Blog z prawdziwymi artykułami
- System rezerwacji konsultacji online
- Integracja z Google Maps
- Wielojęzyczność (i18n)
- PWA (Progressive Web App)

---

**Autor**: Projekt stworzony według wzoru z załączonego zdjęcia biura rachunkowego
**Data**: Wrzesień 2025