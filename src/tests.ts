// Tester för ui.ts. Ändra inte den här filen.
import type { Ratt } from "./typer";
import { test, assertEqual, assertTrue, visaResultat } from "./testlib";
import { skapaRattKort, visaMeny, uppdateraRubrik, markeraDagensRatt } from "./ui";

const bulle: Ratt = { id: 1, namn: "Kardemummabulle", pris: 35, kategori: "bakverk", vegetarisk: true, bild: "images/bulle.svg", beskrivning: "Bakad på färsk kardemumma." };
const kaffe: Ratt = { id: 2, namn: "Bryggkaffe", pris: 32, kategori: "dryck", vegetarisk: true, bild: "images/kaffe.svg", beskrivning: "Lokalrostat." };
const latte: Ratt = { id: 5, namn: "Latte", pris: 45, kategori: "dryck", vegetarisk: true, bild: "images/kaffe.svg", beskrivning: "Espresso med mjölk." };

test("skapaRattKort: returnerar ett article-element", () => {
  assertEqual(skapaRattKort(bulle).tagName, "ARTICLE");
});
test("skapaRattKort: har data-id med rättens id", () => {
  assertEqual(skapaRattKort(bulle).dataset.id, "1");
});
test("skapaRattKort: rubriken (h3) innehåller namnet", () => {
  assertEqual(skapaRattKort(bulle)?.querySelector("h3")?.textContent, "Kardemummabulle");
});
test("skapaRattKort: beskrivningen finns med", () => {
  assertTrue(skapaRattKort(bulle).textContent.includes("Bakad på färsk kardemumma."));
});
test("skapaRattKort: priset är formaterat i .pris", () => {
  assertEqual(skapaRattKort(bulle)?.querySelector(".pris")?.textContent, "35 kr");
});
test("skapaRattKort: bilden har src och en alt-text", () => {
  const bild = skapaRattKort(bulle).querySelector("img");
  assertTrue(bild?.getAttribute("src")?.endsWith("images/bulle.svg"), "src");
  assertTrue((bild?.alt.length ?? 0) > 0, "alt saknas");
});
test("skapaRattKort: text från data tolkas aldrig som HTML", () => {
  const farlig = { ...bulle, namn: "<b>Fet</b>", beskrivning: "<i>kursiv</i>" };
  const kort = skapaRattKort(farlig);
  assertEqual(kort.querySelector("h3")?.textContent, "<b>Fet</b>");
  assertEqual(kort.querySelector("b"), null, "ett b-element skapades av data");
  assertEqual(kort.querySelector("i"), null, "ett i-element skapades av data");
});

test("visaMeny: ett kort per rätt", () => {
  const box = document.createElement("div");
  visaMeny(box, [bulle, kaffe, latte]);
  assertEqual(box.querySelectorAll("article").length, 3);
});
test("visaMeny: tömmer först, så att anrop två gånger inte dubblerar", () => {
  const box = document.createElement("div");
  visaMeny(box, [bulle, kaffe]);
  visaMeny(box, [bulle, kaffe]);
  assertEqual(box.querySelectorAll("article").length, 2);
});
test("visaMeny: tom lista visar ett .tom-stycke och inga kort", () => {
  const box = document.createElement("div");
  visaMeny(box, [bulle]);
  visaMeny(box, []);
  assertEqual(box.querySelectorAll("article").length, 0);
  assertEqual(box.querySelectorAll("p.tom").length, 1);
});

test("uppdateraRubrik: flera rätter", () => {
  const h2 = document.createElement("h2");
  uppdateraRubrik(h2, 8);
  assertEqual(h2.textContent, "Meny (8 rätter)");
});
test("uppdateraRubrik: en rätt säger rätt, inte rätter", () => {
  const h2 = document.createElement("h2");
  uppdateraRubrik(h2, 1);
  assertEqual(h2.textContent, "Meny (1 rätt)");
});

test("markeraDagensRatt: bara rätt kort får klassen", () => {
  const box = document.createElement("div");
  visaMeny(box, [bulle, kaffe, latte]);
  markeraDagensRatt(box, 2);
  const markerade = [...box.querySelectorAll<HTMLElement>("article.dagens")].map(k => k.dataset.id);
  assertEqual(markerade, ["2"]);
});
test("markeraDagensRatt: markeringen flyttas vid nytt anrop", () => {
  const box = document.createElement("div");
  visaMeny(box, [bulle, kaffe, latte]);
  markeraDagensRatt(box, 2);
  markeraDagensRatt(box, 5);
  const markerade = [...box.querySelectorAll<HTMLElement>("article.dagens")].map(k => k.dataset.id);
  assertEqual(markerade, ["5"]);
});

visaResultat();
