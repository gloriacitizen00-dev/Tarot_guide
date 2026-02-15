const readline = require("readline");

// Major Arcana (22 cards)
const majorArcana = [
  "The Fool","The Magician","The High Priestess","The Empress","The Emperor",
  "The Hierophant","The Lovers","The Chariot","Strength","The Hermit",
  "Wheel of Fortune","Justice","The Hanged Man","Death","Temperance",
  "The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"
];

// Minor Arcana (56 cards)
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

// Build deck
function getDeck(option) {
  if (option === "major") return majorArcana;
  if (option === "minor") return minorArcana;
  if (option === "mixed") return majorArcana.concat(minorArcana);
}

// Shuffle deck
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Interpretation
function interpretCard(card) {
  if (!card) return "No card was drawn.";
  if (card.includes("Cups")) return "This card reflects emotions, relationships, and connections.";
  if (card.includes("Swords")) return "This card reflects challenges, decisions, and mental clarity.";
  if (card.includes("Wands")) return "This card reflects action, creativity, and ambition.";
  if (card.includes("Pentacles")) return "This card reflects material matters, work, and stability.";
  return "This card reflects destiny, transformation, and higher forces.";
}

// Interactive spread
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const deckCuriosity = shuffle(getDeck("mixed"));
let currentCard = 0;

function askQuestion() {
  if (currentCard >= 3) {
    console.log("The spread has ended (maximum 3 cards).");
    rl.close();
    return;
  }

  const card = deckCuriosity[currentCard];
  console.log(`Card ${currentCard + 1}: ${card}`);
  console.log("Message:", interpretCard(card));

  currentCard++;

  if (currentCard < 3) {
    console.log("Options: [yes] for another question | [no] to end");
    rl.question("Do you have another question? ", (answer) => {
      if (answer.toLowerCase() === "yes") {
        askQuestion();
      } else {
        console.log("The spread has ended.");
        rl.close();
      }
    });
  } else {
    console.log("The spread has ended (maximum 3 cards).");
    rl.close();
  }
}

console.log("=== The Curiosity Spread ===");
askQuestion();