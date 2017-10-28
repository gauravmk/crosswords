const squareSize = 40; // in px

function drawGrid() {
  const size = Math.sqrt(puzzData.layout.length);
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      const squareNum = i * size + j;
      const eltProps = {
        "data-i": i,
        "data-j": j,
        "data-squareNum": squareNum,
        "class": "puzzSquare",
      }
      const elt = $("<div>", eltProps);
      if (puzzData.layout[squareNum] == 0) {
        elt.addClass("black");
      }
      $("#puzzContainer").append(elt);
      $("#puzzContainer").css({ width: `${(squareSize + 2) * size}px` });
    }
  }

  // Grab clueNums to populate the little numbers
  ["A", "D"].forEach(dir => {
    const clueNums = {}
    puzzData.clues[dir].forEach(e => clueNums[e.clueNum] = e.clueStart)

    for (key in clueNums) {
      val = clueNums[key];
      const square = $(`div[data-squareNum='${val}']`);

      // Draw the clue number if you haven't already
      if ($(`div[data-clueNum='${key}']`).length === 0) {
        const littleNum = $("<div>", {"class": "clueNum", "data-clueNum": key});
        littleNum.html(key);
        square.append(littleNum);
      }

      // Annotate squares that are part of this clue so they are easier to fetch later
      let clueSquare = $(`div[data-squareNum='${val}']`);
      while (!clueSquare.hasClass("black")) {
        clueSquare.attr(`data-dir-${dir}`, key);
        const curSquareNum = clueSquare.data('squarenum')
        // Advance
        if (dir === 'A') {
          if ((curSquareNum + 1) % Math.sqrt(puzzData.layout.length) == 0) {
            break;
          }
          clueSquare = $(`div[data-squareNum='${curSquareNum + 1}'`);
        } else {
          break;
        }
      }
    }
  });
}

function drawRules() {
  ['A', 'D'].forEach((dir) => {
    const ruleCol = $("<div>", {"class": "ruleCol"});
    puzzData.clues[dir].forEach(rule => {
      const ruleElt = $("<div>", {"class": "ruleRow"});
      ruleElt.html(`${rule.clueNum}: ${rule.value}`);
      ruleCol.append(ruleElt);
    });
    $("#puzzRules").append(ruleCol);
  });
}

function createEmptyCrossword() {
  drawGrid();
  drawRules();
  setUpHandlers();
}
