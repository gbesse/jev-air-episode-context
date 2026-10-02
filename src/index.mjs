// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "coherent_episode": "episode_coherent",
  "review_required": "revue_requise",
  "isolated_signal": "signal_isole",
  "no_measurement": "aucune_mesure_fournie"
});
const CRITERIA = Object.freeze({
  "coherent_episode": "episode coherent",
  "review_required": "revue requise",
  "isolated_signal": "signal isole",
  "no_measurement": "aucune mesure fournie"
});
export function airEpisodeCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessAirEpisode(input, provider) {
  const record = airEpisodeCase(input);
  if (Array.isArray(record.measurements) && record.measurements.length === 0) return { decision: "no_measurement", label: DECISIONS["no_measurement"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez le polluant dominant, la durée, la concordance entre stations et les réserves de qualité indiquées dans les données. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-air-episode-context <dossier.json>");
  const dossier = airEpisodeCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessAirEpisode avec un fournisseur Jev configuré." }, null, 2));
}
