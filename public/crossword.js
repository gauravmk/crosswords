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
  const clueNums = {}
  puzzData.clues.A.forEach(e => clueNums[e.clueNum] = e.clueStart)
  puzzData.clues.D.forEach(e => clueNums[e.clueNum] = e.clueStart)

  for (key in clueNums) {
    val = clueNums[key];
    const square = $(`div[data-squareNum='${val}']`);
    const littleNum = $("<div>", {"class": "clueNum"});
    littleNum.html(key);
    square.append(littleNum);
  }
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
}
