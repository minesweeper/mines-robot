# mines

A pure JS implementation of a robot player for the minesweeper game.

## Installation

```
npm install mines-robot --save
```

## Usage

```javascript
var mines = require('mines');
var robot = require('mines-robot');

var game = mines.create();
game.onGameStateChange(
  function () {
    console.log(game.renderAsString());
  }
);
robot.takeTurn(game); // takes a single turn (marking mines and revealing at least one cell)
```

## Development

```
npm install
npm test
npm run dist
```

```javascript
var robot = require('./dist');
```

## Release History

* 0.0.1 Initial release
* 0.0.2 Initial release with babel transpilation
* 0.1.0 Basic release with very simple guessing, mine and cell logic.
* 0.2.0 Adds some probability based guessing
* 0.2.1 Fix bug where robot could get stuck if it couldn't determine any probabilities
* 0.2.2 Adds probabilities for every cell (based upon remaining mine count)
* 0.2.3 bestGuess is much simpler now
* 0.3.0 The first attempt at adding clusters detecting 1-1 and 1-2 patterns
* 0.4.0 Add derived clusters
* 0.5.0 New and improved 'safe cells from clusters' - gets expert pass rate to about 15%
