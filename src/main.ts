// Dag 4: DOM. Kör npm run dev och titta i Console (F12).
// querySelector kan ge null om elementet saknas. Hantera det med if eller ?. (TypeScript kräver det).
// Tips: document.querySelector<HTMLElement>("#id") säger vilken sorts element du får.
import { meny } from "./data";
import { visaMeny, uppdateraRubrik, markeraDagensRatt } from "./ui";
import { billigast } from "./meny";

// DEL 1: utforska DOM:en ----------------------------------------------
// 1. Hämta h1 med document.querySelector("h1") och skriv ut dess textContent.
console.log(document.querySelector("h1").textContent);
// 2. Ändra texten i #hero-rubrik till "Välkommen in!"
document.querySelector("#hero-rubrik").textContent = "Välkommen in!";
// 3. Hämta alla länkar i menyn med document.querySelectorAll("nav a").
//    Loopa med for...of och skriv ut varje länks href och text.
let lankar: string[] = document.querySelectorAll("nav a");
for (let i = 0; i < lankar.length; i++) {
  console.log(`Href: ${lankar[i].href} Text: ${lankar[i].textContent}`);
}
// 4. Skapa ett nytt p-element (document.createElement), ge det texten
//    "Dagens tips: prova en kardemummabulle." och lägg det sist i #hero med append.
let p = document.createElement('p');
p.textContent = "Dagens tips: prova en kardemummabulle.";
document.querySelector("#hero").append(p);
// 5. Lägg klassen "dagens" på #hero med classList.add. Ta bort den med classList.remove.
document.querySelector("#hero").classList.add("dagens");
document.querySelector("#hero").classList.remove("dagens");
// 6. Säkerhetsförsök: sätt p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">'
//    Vad händer i Console? Byt sedan till p.textContent med samma text. Vad händer nu?
// TODO
// p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">';
// p.textContent = '<img src="x" onerror="console.log(\'Attack!\')">';

// DEL 2: koppla ihop med funktionerna i ui.js ----------------------------
// 7. Hämta #meny-lista och #meny-rubrik.
let menyLista = document.querySelector("#meny");
let menyRubrik = document.querySelector("#meny-rubrik");
// 8. Anropa visaMeny med menyn, och uppdateraRubrik med antalet rätter.
visaMeny(menyLista, meny);
uppdateraRubrik(menyRubrik, meny.length);
// 9. Dagens rätt = den billigaste lunchen. Använd filter och billigast (från meny.js)
//    och markeraDagensRatt.
markeraDagensRatt(menyLista, billigast(meny).id);
// TODO
