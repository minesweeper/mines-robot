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

var game = mines();
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
