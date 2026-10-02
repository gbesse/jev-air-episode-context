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
void assessAirEpisode(dossier, createFakeProvider(() => ({})));
