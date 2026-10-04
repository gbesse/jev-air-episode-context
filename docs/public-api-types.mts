// Objectif : vérifier les types publiés depuis un projet consommateur.
import { airEpisodeCase, assessAirEpisode, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = airEpisodeCase({
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
});
void DECISIONS;
void assessAirEpisode(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "coherent_episode", probabilities: { "coherent_episode": 0.82, "review_required": 0.06, "isolated_signal": 0.06, "no_measurement": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessAirEpisode(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
