# Reversi

The disc-flipping game on an 8 × 8 board: surround the computer's discs to turn them to your colour. When nobody can move any more, whoever has the most discs wins.

*Version française : [README.md](README.md)*

## Rules

- The game starts with four discs in the centre, two of each colour. You play **black** and move first.
- A disc can only be placed if it **surrounds** at least one opposing disc between itself and another of your discs, in a row, column or diagonal. Every surrounded disc flips, in all directions at once.
- **Green dots** show where you can play; the last move is marked.
- With no possible move, you **pass** (the game says so). When neither player can move, the game is over.
- The most discs at the end wins; with equal discs, it is a draw.

Tip: **corners** can never be taken back, so they are the best squares. Avoid giving the computer a corner by playing right next to one.

## Controls

- **Click** a square marked with a dot to play there.
- **New game** to start again; at the end of a game, a click starts another.

## Levels

- **Easy**: often plays at random, otherwise the move that flips the most discs.
- **Normal**: prefers good squares (corners, edges) and avoids those that give away a corner.
- **Hard**: looks 4 moves ahead, weighing position and number of discs.

## Statistics

Wins, losses and draws for each level.

## Data and sync

Your record per level and chosen level are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Reversi → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
