function getMinMove(start, target, brokenTiles) {
  let ans = 0;
  var board = [];
  for (var i = 0; i < 8; i++) {
    board.push(new Array(8).fill(false));
  }

  var broken = {};
  for (var i = 0; i < brokenTiles.length; i++) {
    broken[brokenTiles[i].toLowerCase()] = true;
  }

  var steps = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  var sx = start.charCodeAt(0) - 97;
  var sy = parseInt(start[1]) - 1;

  var tx = target.charCodeAt(0) - 97;
  var ty = parseInt(target[1]) - 1;

  var q = [];
  q.push([sx, sy, 0]);
  board[sx][sy] = true;
  while (q.length > 0) {
    var cur = q.shift();
    var x = cur[0];
    var y = cur[1];
    var d = cur[2];

    if (x == tx && y == ty) {
      ans = d;
      break;
    }

    for (var i = 0; i < steps.length; i++) {
      var nx = x + steps[i][0];
      var ny = y + steps[i][1];

      if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        var pos = String.fromCharCode(nx + 97) + (ny + 1);

        if (!board[nx][ny] && !broken[pos]) {
          board[nx][ny] = true;
          q.push([nx, ny, d + 1]);
        }
      }
    }
  }

  return ans;
}

console.log(getMinMove("d6", "h8", ["f6", "f7"]));
