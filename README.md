# Mój ogród — instrukcja krok po kroku

> **Ważne:** folder `src/content/rosliny/` zawiera teraz Twoją prawdziwą listę 34 roślin
> (z pielęgnacją: podlewanie, nasłonecznienie, przycinanie, zimowanie w treści strony).
> Trzy pola w każdym pliku są jeszcze do uzupełnienia z Twojej strony:
> - `lokalizacja` — obecnie "TODO", wpisz gdzie w ogrodzie rośnie
> - `ogrodowe_zdjecie`, `hotspot_top`, `hotspot_left` — obecnie ustawione domyślnie na
>   zdjęcie 1 / środek zdjęcia (50/50) dla wszystkich roślin naraz. Użyj narzędzia
>   `zaznacz-rosliny.html` (patrz punkt 2 niżej), żeby ustawić prawdziwe pozycje —
>   inaczej wszystkie kropki nałożą się na siebie na jednym zdjęciu.

## 1. Wgraj swoje zdjęcia

**Zdjęcia całego ogrodu** (te z hotspotami) → folder `public/images/`:

```
public/images/ogrod-1.jpg
public/images/ogrod-2.jpg
public/images/ogrod-3.jpg
public/images/ogrod-4.jpg
public/images/ogrod-5.jpg
```

Podpisy pod każdym zdjęciem (np. "Rabata przy tarasie") ustawiasz w `src/pages/index.astro`,
w tablicy `zdjeciaOgrodu` na górze pliku — dla zdjęć 4 i 5 są tam na razie podpisy tymczasowe,
podmień je na właściwe.

**Zdjęcia pojedynczych roślin** (widoczne na stronie szczegółów) → folder `public/images/rosliny/`:

```
public/images/rosliny/hortensja.jpg
public/images/rosliny/lawenda.jpg
public/images/rosliny/bukszpan.jpg
public/images/rosliny/pomidor.jpg
public/images/rosliny/bazylia.jpg
public/images/rosliny/paproc.jpg
public/images/rosliny/hosta.jpg
```

Usuń oba pliki `PLACEHOLDER.txt` po wgraniu zdjęć — są tylko po to, żeby Git nie zignorował pustych folderów.

## 2. Oznacz rośliny na zdjęciu ogrodu (pozycja kropki)

Najłatwiej użyć dołączonego narzędzia **`zaznacz-rosliny.html`** (osobny plik, otwórz go dwuklikiem
w przeglądarce — nie trzeba nic instalować):

1. Wpisz numer zdjęcia (1–5, zgodnie z nazwą pliku `ogrod-N.jpg`).
2. Wgraj to zdjęcie z dysku.
3. Kliknij dokładnie w miejsce każdej rośliny na zdjęciu — pojawi się kropka i wiersz w tabeli.
4. Wpisz nazwę przy każdym wierszu.
5. Skopiuj wygenerowany blok (`ogrodowe_zdjecie`, `hotspot_top`, `hotspot_left`) i wklej odpowiednie
   trzy linijki do pliku danej rośliny w `src/content/rosliny/nazwa.md`, zastępując istniejące wartości.

Powtórz dla każdego z 5 zdjęć.

Jeśli wolisz ręcznie: każda roślina ma w swoim pliku markdown pola:

```yaml
hotspot_top: 38
hotspot_left: 22
```

To pozycja kropki w **procentach** szerokości/wysokości zdjęcia (0 = góra/lewo, 100 = dół/prawo) —
narzędzie powyżej liczy to za Ciebie z miejsca kliknięcia, więc nie musisz mierzyć pikseli ręcznie.

Pole `ogrodowe_zdjecie: 1` mówi, na którym z pięciu zdjęć (1–5) ma się pojawić dana roślina.

### Jak przesunąć już zaznaczoną roślinę

Nie trzeba wgrywać zdjęcia od nowa — po prostu zmień ręcznie liczby `hotspot_top` / `hotspot_left`
w pliku tej rośliny (np. `+2` żeby przesunąć trochę w dół/prawo) i zapisz plik. Przy `npm run dev`
strona odświeży się automatycznie, więc widzisz efekt od razu. Możesz też ponownie otworzyć
`zaznacz-rosliny.html`, wgrać to samo zdjęcie i kliknąć w nowe miejsce — dostaniesz nowe współrzędne.

## 3. Dodaj / usuń / edytuj rośliny

Żeby dodać nową roślinę: skopiuj dowolny plik z `src/content/rosliny/`, zmień nazwę pliku i zawartość:

```yaml
---
name: "Nazwa rośliny"
zdjecie: "/images/rosliny/nazwa.jpg"
lokalizacja: "gdzie w ogrodzie"
podlewanie: "..."
naslonecznienie: "..."
przycinanie: "..."
ogrodowe_zdjecie: 1
hotspot_top: 50
hotspot_left: 50
---

Dowolny dodatkowy opis pielęgnacji, historia rośliny itd.
```

Strona `/rosliny/nazwa-pliku` wygeneruje się automatycznie — nie trzeba nic więcej robić.

## 4. Uruchom lokalnie i sprawdź efekt

Wymaga zainstalowanego Node.js (masz już na swoim MacBooku).

```bash
cd ogrod-astro
npm install
npm run dev
```

Otwórz `http://localhost:4321` w przeglądarce. Zmiany w plikach markdown i zdjęciach odświeżają się automatycznie.

## 5. Wrzuć na GitHub

```bash
cd ogrod-astro
git init
git add .
git commit -m "Pierwsza wersja strony ogrodu"
```

Na GitHubie utwórz nowe, puste repozytorium (bez README, bez .gitignore — już je masz), np. `ogrod`.
Potem:

```bash
git remote add origin https://github.com/TWOJ-LOGIN/ogrod.git
git branch -M main
git push -u origin main
```

## 6. Podłącz Cloudflare Pages

1. Zaloguj się do Cloudflare → **Workers & Pages** → **Create application** → zakładka **Pages** → **Connect to Git**.
2. Wybierz repozytorium `ogrod`.
3. Ustawienia builda:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Kliknij **Save and Deploy**. Cloudflare zbuduje stronę i da Ci tymczasowy adres `*.pages.dev` — sprawdź, czy wszystko działa.

## 7. Podepnij własną subdomenę

1. W projekcie Pages → **Custom domains** → **Set up a custom domain**.
2. Wpisz np. `ogrod.twojadomena.pl`.
3. Cloudflare automatycznie doda potrzebny rekord DNS (CNAME) w Twojej strefie — jeśli domena jest już
   w Cloudflare (a tak jest w Twoim przypadku), dzieje się to jednym kliknięciem, bez ręcznego grzebania w DNS.
4. Po chwili propagacji (zwykle kilka minut) strona działa pod Twoją subdomeną, z automatycznym SSL.

Od tej pory każdy `git push` na branch `main` automatycznie przebuduje i zaktualizuje stronę.
