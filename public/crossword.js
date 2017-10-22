const squareSize = 40; // in px

function createEmptyCrossword() {
  const size = Math.sqrt(puzzData.layout.length);
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      const elt = $("<div>", {"class": "puzzSquare", style: `top: ${squareSize * i}px; left: ${squareSize * j}px`});
      if (puzzData.layout[i * size + j] == 0) {
        elt.addClass("black");
      }
      $("#puzzContainer").append(elt);
    }
  }
}
