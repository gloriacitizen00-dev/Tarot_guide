const majorArcana = [
  "El Loco","El Mago","La Sacerdotisa","La Emperatriz","El Emperador",
  "El Hierofante","Los Enamorados","El Carro","La Fuerza","El Ermitaño",
  "La Rueda de la Fortuna","La Justicia","El Colgado","La Muerte","La Templanza",
  "El Diablo","La Torre","La Estrella","La Luna","El Sol","El Juicio","El Mundo"
];

const minorArcana = [
  // Copas
  "As de Copas","Dos de Copas","Tres de Copas","Cuatro de Copas","Cinco de Copas",
  "Seis de Copas","Siete de Copas","Ocho de Copas","Nueve de Copas","Diez de Copas",
  "Sota de Copas","Caballo de Copas","Reina de Copas","Rey de Copas",

  // Espadas
  "As de Espadas","Dos de Espadas","Tres de Espadas","Cuatro de Espadas","Cinco de Espadas",
  "Seis de Espadas","Siete de Espadas","Ocho de Espadas","Nueve de Espadas","Diez de Espadas",
  "Sota de Espadas","Caballo de Espadas","Reina de Espadas","Rey de Espadas",

  // Bastos
  "As de Bastos","Dos de Bastos","Tres de Bastos","Cuatro de Bastos","Cinco de Bastos",
  "Seis de Bastos","Siete de Bastos","Ocho de Bastos","Nueve de Bastos","Diez de Bastos",
  "Sota de Bastos","Caballo de Bastos","Reina de Bastos","Rey de Bastos",

  // Oros
  "As de Oros","Dos de Oros","Tres de Oros","Cuatro de Oros","Cinco de Oros",
  "Seis de Oros","Siete de Oros","Ocho de Oros","Nueve de Oros","Diez de Oros",
  "Sota de Oros","Caballo de Oros","Reina de Oros","Rey de Oros"
];

function getDeck(option) {
  if (option === "major") return majorArcana;
  if (option === "minor") return minorArcana;
  if (option === "mixed") return majorArcana.concat(minorArcana);
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Tirada Paw Prints Path (4 cartas en línea)
function pawprintsPathSpread(deck) {
  return {
    "Paso 1 - Dónde has estado": deck[0],
    "Paso 2 - Dónde estás": deck[1],
    "Paso 3 - Hacia dónde te diriges": deck[2],
    "Paso 4 - El destino que te espera": deck[3]
  };
}

function interpretSpread(spread) {
  console.log("=== The Paw Prints Path 🐾🌙 ===");
  console.log("Focus: Journey and destiny.");
  console.log("Instruction: Place four cards in a line, like pawprints leading forward.");
  console.log("");

  for (const [position, card] of Object.entries(spread)) {
    console.log(`${position}: ${card}`);
    console.log("-----------------------------");
  }

  // Contar palos
  const allCards = Object.values(spread);
  let copas = 0, espadas = 0, bastos = 0, oros = 0;

  allCards.forEach(card => {
    if (card.includes("Copas")) copas++;
    else if (card.includes("Espadas")) espadas++;
    else if (card.includes("Bastos")) bastos++;
    else if (card.includes("Oros")) oros++;
  });

  // Mensaje global
  let mensajeFinal = "El camino refleja destino, transformación y sabiduría profunda.";
  if (copas > espadas && copas > bastos && copas > oros) {
    mensajeFinal = "El camino refleja emociones, vínculos y apoyo espiritual.";
  } else if (espadas > copas && espadas > bastos && espadas > oros) {
    mensajeFinal = "El camino refleja retos mentales, claridad y protección.";
  } else if (bastos > copas && bastos > espadas && bastos > oros) {
    mensajeFinal = "El camino refleja acción, energía creativa y guía espiritual.";
  } else if (oros > copas && oros > espadas && oros > bastos) {
    mensajeFinal = "El camino refleja materia, estabilidad y seguridad.";
  }

  console.log("");
  console.log("=== Mensaje Global ===");
  console.log(mensajeFinal);
}

// Ejecutar tirada
const deckPawprints = shuffle(getDeck("mixed"));
const spread = pawprintsPathSpread(deckPawprints);
interpretSpread(spread);