# Reversi

Le jeu de pions à retourner sur un plateau de 8 × 8 : encadre les pions de l'ordinateur pour qu'ils passent à ta couleur. Quand plus personne ne peut jouer, celui qui a le plus de pions gagne.

*English version: [README.en.md](README.en.md)*

## Les règles

- La partie commence avec quatre pions au centre, deux de chaque couleur. Tu as les **noirs** et tu commences.
- Un pion se pose seulement s'il **encadre** au moins un pion adverse entre lui et un autre de tes pions, en ligne, en colonne ou en diagonale. Tous les pions encadrés se retournent, dans toutes les directions à la fois.
- Les **points verts** montrent les cases où tu peux jouer ; le dernier coup joué est marqué.
- Sans coup possible, on **passe son tour** (le jeu l'annonce). Quand aucun des deux ne peut jouer, la partie est finie.
- Le plus de pions à la fin gagne ; à égalité de pions, c'est un match nul.

Conseil : les **coins** ne peuvent jamais être repris, ce sont les meilleures cases. Évite de donner un coin à l'ordinateur en jouant juste à côté.

## Commandes

- **Clic** sur une case marquée d'un point pour y jouer.
- **Nouvelle partie** pour recommencer ; en fin de partie, un clic en relance une.

## Niveaux

- **Facile** : joue souvent au hasard, sinon le coup qui retourne le plus de pions.
- **Normal** : préfère les bonnes cases (coins, bords) et évite celles qui offrent un coin.
- **Difficile** : prévoit 4 coups à l'avance en pesant la position et le nombre de pions.

## Statistiques

Victoires, défaites et matchs nuls pour chaque niveau.

## Données et synchronisation

Ton bilan par niveau et le niveau choisi sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Reversi → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
