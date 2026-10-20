# Dag 4 · DOM: kaféets sida byggs av data

*Modul 5, UI/UX & Frontendutveckling (JavaScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du lär dig **DOM**: hur JavaScript hittar, läser, ändrar och skapar element på sidan. I slutet bygger du hela kaféets meny från datan i `data.js` istället för från hårdkodad HTML, med funktioner som en testsida kontrollerar.

## Bakgrund

När webbläsaren läser din HTML bygger den ett *träd* av element: **DOM** (Document Object Model). JavaScript kan hitta ett element i trädet, läsa det, ändra det och skapa nya. Det är så alla dynamiska sidor fungerar. Du har redan en färdig sida från modul 4 (kaféets sida finns i det här repot), och menyn från igår ligger som data. Idag kopplar du ihop dem.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code och starta *Live Server*.
3. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console (F12) efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
4. **Skicka upp** när du är klar: `git push`.
5. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass.

Filer som använder `import` fungerar bara när sidan öppnas med *Live Server*. Dubbelklickar du på en HTML-fil hamnar du på `file://` och får ett CORS-fel i Console.

## Uppgiften steg för steg

### Steg 1. Utforska med DevTools

Starta Live Server på `index.html`. Öppna DevTools → *Elements*. Klicka på ett element, öppna *Console* och skriv `$0`. Du har nu en referens till elementet. Skriv `$0.textContent` och `$0.className`. Prova `document.querySelector("h1")` direkt i Console.

### Steg 2. Hämta och ändra

Öppna `main.js`, del 1, uppgift 1–3. Hämta rubriken och skriv ut texten, ändra texten i `#hero-rubrik` och loopa genom menylänkarna med `querySelectorAll`. Spara och se sidan ändras direkt.

### Steg 3. Skapa ett nytt element

Uppgift 4: skapa ett nytt `p` med `createElement`, ge det text med `textContent` och lägg det sist i hero-sektionen med `append`. Fundera: var finns elementet *innan* du lägger in det?

### Steg 4. Klasser

Uppgift 5: lägg till och ta bort klassen `dagens` på hero med `classList.add` och `classList.remove`. Titta i DevTools hur `class`-attributet ändras. Klassen finns redan i `js.css`.

### Steg 5. textContent eller innerHTML?

Uppgift 6: ett säkerhetsförsök. Sätt `innerHTML` till en bildtagg med `onerror` och se vad som händer i Console. Byt sedan till `textContent`. Skriv i en kommentar, med egna ord, varför man aldrig ska sätta `innerHTML` med text som en användare eller ett API har skrivit.

### Steg 6. skapaRattKort

Öppna `ui.js` och `tests.html`. Skriv `skapaRattKort(ratt)`: ett `article` med bild, rubrik, beskrivning och pris, byggt med `createElement` och `textContent`. Funktionen *returnerar* kortet. Tester kontrollerar bland annat att text från data aldrig tolkas som HTML.

### Steg 7. visaMeny

Skriv `visaMeny(container, ratter)`: töm containern (`replaceChildren()`), lägg in ett kort per rätt. Är listan tom ska ett `p` med klassen `tom` visas. Det här är ditt första *tomt-läge*.

### Steg 8. Rubrik och dagens rätt

Skriv `uppdateraRubrik(element, antal)` (ett enda: "rätt", annars "rätter") och `markeraDagensRatt(container, id)` med `classList.toggle`.

### Steg 9. Koppla ihop i main.js

Del 2 i `main.js`: hämta `#meny-lista` och `#meny-rubrik`, anropa `visaMeny` och `uppdateraRubrik`, och markera den billigaste lunchrätten som dagens rätt med funktionerna från igår (`filter` och `billigast`). Titta på sidan. Menyn ska se likadan ut som i modul 4.

### Steg 10. Prova tomt-läget

I Console (eller tillfälligt i `main.js`): anropa `visaMeny(lista, [])`. Vilket meddelande får användaren? Skriv ett bättre, och ändra det i `ui.js`. Kontrollera att testerna fortfarande är gröna.

## Kontrollista: så vet du att du är klar

- [ ] Alla 31 tester på `tests.html` är gröna (17 från igår och 14 nya).
- [ ] Menyn på `index.html` byggs av JavaScript och ser ut som i modul 4.
- [ ] Den billigaste lunchrätten är markerad som dagens rätt.
- [ ] Du använder `textContent` och `createElement`, inte `innerHTML`, för data.
- [ ] Du kan förklara skillnaden mellan `querySelector` och `querySelectorAll`.
- [ ] Du har gjort minst sex commits.

## Tips om du fastnar

- `Cannot read properties of null (reading ...)` betyder att `querySelector` inte hittade elementet. Kontrollera väljaren (`#` för id, `.` för klass) och att skriptet körs efter att sidan laddats. Moduler gör det automatiskt.
- `x is not iterable`: `querySelectorAll` ger en NodeList som går att loopa med `for...of`, men `querySelector` ger ett enda element.
- Inget syns? Skriv ut elementet med `console.log` och titta i *Elements*: finns det i trädet?
- Menyn syns dubbelt? Du anropar `visaMeny` två gånger utan att tömma, eller `replaceChildren` saknas.
- Bilder syns inte? Sökvägen i `data.js` är relativ till `index.html`: `images/bulle.svg`.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Reflektion: Vad är skillnaden mellan `textContent` och `innerHTML`, och varför är det en säkerhetsfråga?

## Vill du mer? (frivilligt)

- Gör så att `skapaRattKort` visar en liten text "Vegetarisk" i ett `span` för vegetariska rätter.
- Skriv en funktion `skapaTabell(ratter)` som bygger en `table` istället för kort.
- Läs om `insertAdjacentElement` på MDN och skriv om en rad med den.
