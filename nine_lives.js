// Definir los mazos
const majorArcana = [ "El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador",
  "El Hierofante", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
  "La Rueda de la Fortuna", "La Justicia", "El Colgado", "La Muerte",
  "La Templanza", "El Diablo", "La Torre", "La Estrella", "La Luna",
  "El Sol", "El Juicio", "El Mundo"
];

const minorArcana = [
  // Cups
  "As de Copas", "Dos de Copas", "Tres de Copas", "Cuatro de Copas", "Cinco de Copas",
  "Seis de Copas", "Siete de Copas", "Ocho de Copas", "Nueve de Copas", "Diez de Copas",
  "Paje de Copas", "Caballero de Copas", "Reina de Copas", "Rey de Copas",
  // Swords
  "As de Espadas", "Dos de Espadas", "Tres de Espadas", "Cuatro de Espadas", "Cinco de Espadas",
  "Seis de Espadas", "Siete de Espadas", "Ocho de Espadas", "Nueve de Espadas", "Diez de Espadas",
  "Paje de Espadas", "Caballero de Espadas", "Reina de Espadas", "Rey de Espadas",
  // Wands
  "As de Bastos", "Dos de Bastos", "Tres de Bastos", "Cuatro de Bastos", "Cinco de Bastos",
  "Seis de Bastos", "Siete de Bastos", "Ocho de Bastos", "Nueve de Bastos", "Diez de Bastos",
  "Paje de Bastos", "Caballero de Bastos", "Reina de Bastos", "Rey de Bastos",
  // Pentacles
  "As de Oros", "Dos de Oros", "Tres de Oros", "Cuatro de Oros", "Cinco de Oros",
  "Seis de Oros", "Siete de Oros", "Ocho de Oros", "Nueve de Oros", "Diez de Oros",
  "Paje de Oros", "Caballero de Oros", "Reina de Oros", "Rey de Oros"
];

// Función para elegir mazo según preferencia del cliente
function getDeck(option) {
  if (option === "major") return majorArcana;
  if (option === "minor") return minorArcana;
  if (option === "mixed") return majorArcana.concat(minorArcana);
}
// Función para barajar el mazo
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}


// Función para generar la tirada de 9 cartas
function nineLivesSpread(deck) {
  const spread = {};
  for (let i = 0; i < 9; i++) {
    spread[`position${i + 1}`] = deck[i];
  }
  return spread;
}

// Función avanzada para interpretar la tirada completa
function interpretSpread(spread) {
  let cups = 0, swords = 0, wands = 0, pentacles = 0, majors = 0;

  // Contar las cartas por tipo
  for (const pos in spread) {
    const card = spread[pos];
    if (card.includes("Copas")) cups++;
    else if (card.includes("Espadas")) swords++;
    else if (card.includes("Bastos")) wands++;
    else if (card.includes("Oros")) pentacles++;
    else majors++;
  }

  // Crear un ranking de energías
  const energies = [
    { type: "emociones y vínculos", count: cups },
    { type: "retos mentales y decisiones", count: swords },
    { type: "acción y creatividad", count: wands },
    { type: "materia, trabajo y estabilidad", count: pentacles },
    { type: "destino y transformación", count: majors }
  ];

  // Ordenar de mayor a menor
  energies.sort((a, b) => b.count - a.count);

// Detectar armonía total
  const totalCards = cups + swords + wands + pentacles + majors;
  const average = totalCards / energies.length;
  const balanced = energies.every(e => Math.abs(e.count - average) <= 1);

  if (balanced) {
    return "La tirada refleja una armonía total: todas las áreas de tu vida están presentes en equilibrio.";
  }

// Tomar las dos energías principales
  const main = energies[0];
  const secondary = energies[1];

  // Detectar equilibrio
  if (main.count === secondary.count) {
    return "La lectura refleja un balance entre distintas áreas de tu vida, sin que una energía predomine claramente.";
  }

// Construir mensaje normal
  let message = "La lectura revela un equilibrio de energías.";
  if (main.count > 0) {
    message = `La tirada muestra un fuerte énfasis en ${main.type}`;
    if (secondary.count > 0) {
      message += `, acompañado por influencias de ${secondary.type}.`;
    } else {
      message += ".";
    }
  }
  return message;
}

// Ejecutar la tirada con la opción elegida
const deck = getDeck("mixed");  
const shuffledDeck = shuffle(deck);
const result = nineLivesSpread(shuffledDeck);

console.log("=== Nine Lives Spread ===");
console.log(result);
console.log("Mensaje de la lectura:");
console.log(interpretSpread(result));



