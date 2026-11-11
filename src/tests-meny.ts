// Tester för meny.ts. Ändra inte den här filen.
import { test, assertEqual, assertTrue, visaResultat } from "./testlib";
import type { Ratt } from "./typer";
import { meny } from "./data";
import {
  vegetariskaRatter, rattNamn, prislista, hittaRatt, billigast,
  sorteraEfterPris, totalPris, perKategori, medNyttPris,
} from "./meny";

const liten: Ratt[] = [
  { id: 1, namn: "Bulle", pris: 35, kategori: "bakverk", vegetarisk: true },
  { id: 2, namn: "Kaffe", pris: 32, kategori: "dryck", vegetarisk: true },
  { id: 3, namn: "Skinkmacka", pris: 62, kategori: "lunch", vegetarisk: false },
];

test("vegetariskaRatter: bara vegetariska", () => {
  assertEqual(vegetariskaRatter(liten).map(r => r.id), [1, 2]);
});
test("vegetariskaRatter: tom lista ger tom lista", () => {
  assertEqual(vegetariskaRatter([]), []);
});
test("vegetariskaRatter: den riktiga menyn har 6 vegetariska", () => {
  assertEqual(vegetariskaRatter(meny).length, 6);
});

test("rattNamn: bara namnen", () => {
  assertEqual(rattNamn(liten), ["Bulle", "Kaffe", "Skinkmacka"]);
});

test("prislista: namn och pris som text", () => {
  assertEqual(prislista(liten), ["Bulle – 35 kr", "Kaffe – 32 kr", "Skinkmacka – 62 kr"]);
});

test("hittaRatt: hittar via id", () => {
  assertEqual(hittaRatt(liten, 2)?.namn, "Kaffe");
});
test("hittaRatt: okänt id ger undefined", () => {
  assertEqual(hittaRatt(liten, 99), undefined);
});

test("billigast: lägsta priset", () => {
  assertEqual(billigast(liten)?.namn, "Kaffe");
  assertEqual(billigast(meny)?.namn, "Chokladboll");
});
test("billigast: tom lista ger undefined", () => {
  assertEqual(billigast([]), undefined);
});

test("sorteraEfterPris: billigast först", () => {
  assertEqual(sorteraEfterPris(liten).map(r => r.id), [2, 1, 3]);
});
test("sorteraEfterPris: originalet ändras inte", () => {
  const före = liten.map(r => r.id);
  sorteraEfterPris(liten);
  assertEqual(liten.map(r => r.id), före);
});

test("totalPris: summerar antal gånger pris", () => {
  assertEqual(totalPris([{ id: 1, antal: 2 }, { id: 2, antal: 1 }], liten), 102);
});
test("totalPris: tom order är 0, okänt id räknas som 0", () => {
  assertEqual(totalPris([], liten), 0);
  assertEqual(totalPris([{ id: 99, antal: 3 }], liten), 0);
});

test("perKategori: räknar per kategori", () => {
  assertEqual(perKategori(liten), { bakverk: 1, dryck: 1, lunch: 1 });
  assertEqual(perKategori(meny), { bakverk: 3, dryck: 2, lunch: 3 });
});

test("medNyttPris: ny kopia med nytt pris", () => {
  const ny = medNyttPris(liten[0], 40);
  assertEqual(ny.pris, 40);
  assertEqual(ny.namn, "Bulle");
});
test("medNyttPris: originalet ändras inte", () => {
  medNyttPris(liten[0], 99);
  assertEqual(liten[0].pris, 35);
});
test("medNyttPris: returnerar ett annat objekt, inte samma", () => {
  assertTrue(medNyttPris(liten[0], 40) !== liten[0]);
});

visaResultat();
