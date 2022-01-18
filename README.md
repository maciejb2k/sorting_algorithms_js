# Projekt JavaScript
Projekt na zaliczenie części **JavaScript** z laboratorium **Technologie Internetowe**.

Uniwersytet Rzeszowski, Informatyka I st. II rok
Wykonał: **Maciej Biel**

Link do działającej wersji: https://maciejb2k.github.io/ti_project_js/

W pliku tym pliku została zawarta wymagana dokumentacja.

## Opis Projektu

Tematem mojego projektu JavaScript jest wizualizacja podstawowych algorytmów sortowania (Bubble Sort, Insert Sort, Select Sort) w ciekawy i efektowny sposób. Oferuje ona szereg modyfikacji tego, jak i jaki algorytm ma sortować, ile elementów i jakich będzie sortowanych oraz jak szybko to się stanie.

Sortowanie odbywa się na liczbach całkowitych dodatnich, przy każdym rozpoczeniu sortowania zostaje wygenerowana lista z losowymi wartościami, zgodnymi z podanymi przez nas parametrami w formularzu.

### Struktura i Omówienie
Strona składa się z czystego HTML, CSS i JS napisanego od zera, nie używałem żadnych zewnętrznych bibliotek do CSS czy JS.

Struktura projektu to:
- w pliku `index.html` - głównego widoku z sortowaniem wybranym algorytmem
- w katalogu `img/` znajduje się logo strony
- w pliku `css/styles.css` zawarłem wszystkie style wraz ze stylami dla RWD
- w pliku `js/app.js` zawarłem kod javascript aplikacji

Strona składa się z:
- Menu bocznego z możliwością edycji parametrów sortowania
- Głównej planszy z wizualizacją sortowania

Funkcjonalności strony:
- Możliwość wyboru ilości elementów do sortowania *(między 1 a 100)*
- Możliwość wyboru minimalnego elementu *(między 1 a 1000)*
- Możliwość wyboru maksymalnego elementu *(między 1 a 1000)*
- Możliwość wyboru szybkości animacji *(0.5x, 1x, 2x, 4x,8x)*
- Możliwość wyboru, czy algorytm ma sortować rosnąco *(ASC)* czy malejąco *(DESC)*
- Możliwość wyboru typu sortowania *(Bubble, Insert lub Select Sort)*

#### HTML i CSS

Polskie znaki są poprawnie wyświetlane dzięki kodowaniu `UTF-8`.

Do stylowania nie używałem id tylko samych klas. Każdy tag posiada swoją własną klasę, zgodną z moją wewnętrzną konwencją nazewnictwa opartą na komponentach (`.Komponent-dziecko--modyfikator`), po to aby uniknąć błędów związanych z CSS Specificity.

Grafiki zostały skompresowane oraz zmniejszone za pomocą strony https://tinypng.com/, by zapewnić stronie krótki czas ładowania i optymalizację pobierania dużych plików dla użytkowników moblinych, dysponujących wolnym połączeniem internetowym.

Formularz został napisany z użyciem znaczników `<form>`, `<label>` dla pól `<input>`, `<select>` dla wyboru elementów z listy rozwijanej, wszystko po to by zapewnić stronie dostępność w najbardziej podstawowym stopniu. Zdjęcia posiadają opisany tag `alt`.

Strona jest w pełni zgodna ze standardami W3C dla HTML i CSS.
- https://validator.w3.org/nu/?doc=https%3A%2F%2Fti-project-js.vercel.app%2Findex.html
- https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fti-project-js.vercel.app%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=pl-PL

Strona również otrzymała pozytywny wynik SEO, ponieważ spełnia jego podstawowe kryteria:
- posiada tag `<title>`
- posiada tag `<meta name="description">`
- posida favicone
- ma szybki czas ładowania
- wyświetla się dobrze na każdym urządzeniu
- Szczegóły: https://www.seoptimer.com/ti-project-js.vercel.app

#### JavaScript
Uzywałem funkcjonalności zgodnych z najnowszymi standardami EcmaScript (co najmniej ES7+).

Aplikacja od strony JS działa w następujący sposób:
- Gdy formularz zostanie wysłany, odpalany jest podpięty do niego `.addEventListener("click")`
  - sprawdzone zostaje, czy nie odbywa się już sortowanie, jeśli tak następuje `return`
  - zostają pobrane i sparsowane wartości z pól formularza za pomocą składni `e.target.elements`
  - jeżeli funkcja `validateForm()` walidująca formularz zwróci `true`, wybierany zostaje rodzaj sortowania i aplikacja kontynuuje działanie
- Następnie generowana jest lista losowych elementów za pomocą funkcji `generateItems()`, zgodnych z podanymi w formularzu parametrami
- Każdy z algorytmów sortowania, tak jak cała aplikacja jest oparty na konstrukcji `async / await`, wygodnej funkcjonalności wprowadzonej w ES7, dzięki czemu asynchroniczny kod JavaScript możemy pisać sekwencyjnie linijka pod linijką, jest on wtedy o wiele czytelniejszy, pomijamy problem callbacków znany z wersji ES5 i niżej. Konstrukcja `async / await` czeka, aż wewnątrz obiektu `Promise` zostanie wywołana funkcja `resolve()`. W projekcie tą asynchroniczną częścią kodu jest funkcja `setTimeout()`, dzieki której z opóźnieniem wykonywane są animacje, która po wywołaniu zostaje wrzucona do API Przeglądarki i po upływie timeoutu zostanie przeniesiona do kolejki, oczekującej, aż stos głównego wątku w JS zostanie opróżniony i wtedy event loop wykona wszystkie funkcje z tej kolejki. Po więcej szczegółów odnosnie asynchroniczności i modelu współbieżności w JavaScript odsyłam do dokumentacji:
  - https://developer.mozilla.org/pl/docs/Web/JavaScript/EventLoop
  - https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Promise
  - https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Statements/async_function
- Metoda pomocnicza `delay()` odpowiada za opóźnienie, `mark()` za zaznaczanie elementów, `unmark()` za odznaczanie elementów, `swap()` za zamianę elementów.
- Podczas zamiany elementów w sortowaniu, nie następuje ich fizyczne przeniesienie w drzewie DOM ani w liście, a zmiana wysokości tych elementów co powoduje wrażenie przeniesienia się dwóch elementów.
- W aplikacji jest dużo metod pomocniczych typu `enableSorting()` lub `disableSorting()` itp., po to aby uniknąć powtórzeń i trzymać się zasady **DRY**.
- Gdy sortowania dobiegnie końca, wyświetlany jest pod formularzem czas trwania animacji oraz można ponownie wybrać parametry do sortowania

### UI / Wygląd Desktop

Design, logo, kolorystykę i ogólny zamysł jak to ma wyglądać i działać wymyśliłem sam. Tak prezentuje się aplikacja na Desktopie:

![ti-project-js vercel app_](https://user-images.githubusercontent.com/6316812/147154374-afad69dd-f3d7-4f71-a0da-ac1026be4aa7.png)
![ti-project-js vercel app_ (4)](https://user-images.githubusercontent.com/6316812/147154599-55c8d586-85e3-4e42-bcc2-2b7c6c530583.png)
![ti-project-js vercel app_ (1)](https://user-images.githubusercontent.com/6316812/147154371-cb97625f-7a5c-444b-a520-6a5740a928b2.png)



### RWD / Wygląda Mobile
Strona poprawnie wyświetla się na urządzeniach moblinych, przy niższej rozdzielczości pokazuje się menu do otworzenia i zamknięcia formularza:

![ti-project-js vercel app_ (2)](https://user-images.githubusercontent.com/6316812/147157844-0a7cddcf-6dfc-4b89-9bcd-dbafad6595d7.png)
![ti-project-js vercel app_ (3)](https://user-images.githubusercontent.com/6316812/147157845-08ae9beb-e679-40b0-bfc8-fc28a1412937.png)
