// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessAirEpisode } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessAirEpisode({
  "id": "exemple-1",
  "text": "Données synthétiques : trois stations d’une même agglomération montrent pendant deux jours une hausse concordante du même polluant.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
