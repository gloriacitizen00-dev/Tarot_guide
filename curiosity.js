const readline = require("readline");

// Importar funciones y mazos (puedes copiar las mismas definiciones de mazos aquí)
const majorArcana = [
  "El Loco",
  "El Mago",
  "La Sacerdotisa",
  "La Emperatriz",
  "El Emperador",
  "El Hierofante",
  "Los Enamorados",
  "El Carro",
  "La Fuerza",
  "El Ermitaño",
  "La Rueda de la Fortuna",
  "La Justicia",
  "El Colgado",
  "La Muerte",
  "La Templanza",
  "El Diablo",
  "La Torre",
  "La Estrella",
  "La Luna",
  "El Sol",
  "El Juicio",
  "El Mundo"
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


// Interpretación simple de una carta
function interpretCard(card) {
  if (card.includes("Copas")) return "Esta carta refleja emociones y vínculos.";
  if (card.includes("Espadas")) return "Esta carta refleja retos mentales y decisiones.";
  if (card.includes("Bastos")) return "Esta carta refleja acción y creatividad.";
  if (card.includes("Oros")) return "Esta carta refleja materia, trabajo y estabilidad.";
  return "Esta carta refleja destino y transformación.";
}


// Función para la tirada "The Curiosity"
function curiositySpread(deck, numCards = 3) {
  const spread = {};
  if (numCards === 1) {
    spread["Respuesta Sí/No"] = deck[0];
  } else if (numCards === 2) {
    spread["Posibilidades"] = deck[0];
    spread["Obstáculos/Contraste"] = deck[1];
  } else {
    spread["Posibilidades"] = deck[0];
    spread["Influencias Ocultas"] = deck[1];
    spread["Espíritu de Exploración"] = deck[2];
  }
  return spread;
}

// Aquí puedes reutilizar interpretSpread si lo copias desde nine_lives.js
function interpretSpread(spread) {
  // ... tu misma lógica de interpretación global ...
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const deckCuriosity = shuffle(getDeck("mixed"));
let currentCard = 0;

function askQuestion() {
  if (currentCard >= 3) {
    console.log("La tirada ha terminado (máximo 3 cartas).");
    rl.close();
    return;
  }

const card = deckCuriosity[currentCard];
  console.log(`Carta ${currentCard + 1}: ${card}`);
  console.log("Mensaje:", interpretCard(card));

currentCard++;

  if (currentCard < 3) {
    console.log("Opciones: [sí] para otra pregunta | [no] para terminar");
    rl.question("¿Tienes otra pregunta? ", (answer) => {
      if (answer.toLowerCase() === "sí" || answer.toLowerCase() === "si") {
        askQuestion();
      } else {
        console.log("La tirada ha terminado.");
        rl.close();
      }
    });
  } else {
    console.log("La tirada ha terminado (máximo 3 cartas).");
    rl.close();
  }
}

console.log("=== The Curiosity Spread ===");
askQuestion();


