// Typerna för kaféets meny. Ändra INTE den här filen.
// En "interface" beskriver hur ett objekt ser ut: vilka egenskaper det har och vilken typ varje egenskap har.

// En union av exakta texter: bara dessa tre värden är tillåtna.
export type Kategori = "bakverk" | "dryck" | "lunch";

export interface Ratt {
  id: number;
  namn: string;
  pris: number;
  kategori: Kategori;
  vegetarisk: boolean;
  bild?: string;          // frågetecknet betyder att egenskapen är valfri
  beskrivning?: string;
}

// En rad i en order: vilken rätt (id) och hur många.
export interface OrderRad {
  id: number;
  antal: number;
}
