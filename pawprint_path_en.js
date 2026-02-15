const majorArcana = [
  "The Fool","The Magician","The High Priestess","The Empress","The Emperor",
  "The Hierophant","The Lovers","The Chariot","Strength","The Hermit",
  "Wheel of Fortune","Justice","The Hanged Man","Death","Temperance",
  "The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"
];

const minorArcana = [
  // Cups
  "Ace of Cups","Two of Cups","Three of Cups","Four of Cups","Five of Cups",
  "Six of Cups","Seven of Cups","Eight of Cups","Nine of Cups","Ten of Cups",
  "Page of Cups","Knight of Cups","Queen of Cups","King of Cups",

  // Swords
  "Ace of Swords","Two of Swords","Three of Swords","Four of Swords","Five of Swords",
  "Six of Swords","Seven of Swords","Eight of Swords","Nine of Swords","Ten of Swords",
  "Page of Swords","Knight of Swords","Queen of Swords","King of Swords",

  // Wands
  "Ace of Wands","Two of Wands","Three of Wands","Four of Wands","Five of Wands",
  "Six of Wands","Seven of Wands","Eight of Wands","Nine of Wands","Ten of Wands",
  "Page of Wands","Knight of Wands","Queen of Wands","King of Wands",

  // Pentacles
  "Ace of Pentacles","Two of Pentacles","Three of Pentacles","Four of Pentacles","Five of Pentacles",
  "Six of Pentacles","Seven of Pentacles","Eight of Pentacles","Nine of Pentacles","Ten of Pentacles",
  "Page of Pentacles","Knight of Pentacles","Queen of Pentacles","King of Pentacles"
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

// Paw Prints Path spread (4 cards in a line)
function pawprintsPathSpread(deck) {
  return {
    "Step 1 - Where you’ve been": deck[0],
    "Step 2 - Where you are": deck[1],
    "Step 3 - Where you’re headed": deck[2],
    "Step 4 - Destiny that awaits": deck[3]
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

  // Count suits
  const allCards = Object.values(spread);
  let cups = 0, swords = 0, wands = 0, pentacles = 0;

  allCards.forEach(card => {
    if (card.includes("Cups")) cups++;
    else if (card.includes("Swords")) swords++;
    else if (card.includes("Wands")) wands++;
    else if (card.includes("Pentacles")) pentacles++;
  });

  // Global message
  let finalMessage = "The path reflects destiny, transformation, and deep wisdom.";
  if (cups > swords && cups > wands && cups > pentacles) {
    finalMessage = "The path reflects emotions, relationships, and spiritual support.";
  } else if (swords > cups && swords > wands && swords > pentacles) {
    finalMessage = "The path reflects challenges, clarity, and protection.";
  } else if (wands > cups && wands > swords && wands > pentacles) {
    finalMessage = "The path reflects action, creative energy, and spiritual guidance.";
  } else if (pentacles > cups && pentacles > swords && pentacles > wands) {
    finalMessage = "The path reflects material matters, stability, and security.";
  }

  console.log("");
  console.log("=== Global Message ===");
  console.log(finalMessage);
}

// Run spread
const deckPawprints = shuffle(getDeck("mixed"));
const spread = pawprintsPathSpread(deckPawprints);
interpretSpread(spread);