# Comment la décision est prise

Explique un épisode de pollution atmosphérique à partir de mesures réglementaires sans recalculer les seuils officiels.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon le polluant dominant, la durée, la concordance entre stations et les réserves de qualité indiquées dans les données. Une confiance inférieure à `0.8` marque le résultat pour revue humaine.

Les agrégations, seuils réglementaires et indicateurs officiels restent calculés ou recopiés par le code.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
