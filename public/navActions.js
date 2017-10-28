var selectionState = {
  squareNum: null,
  vertical: true
}

function setUpHandlers() {
  $(".puzzSquare:not(.black)").click(evt => {
      const square = $(evt.currentTarget);

      const newNum = square.data('squarenum');
      if (selectionState.squareNum == newNum) {
        selectionState.vertical = !selectionState.vertical;
      } else {
        selectionState.squareNum = newNum;
      }

      updateSelectionUI();
  });
}

function getSquareByNum(num) {
  return $(`div[data-squareNum='${num}']`);
}

function updateSelectionUI() {
  $(".selected").removeClass("selected");
  $(".highlighted").removeClass("highlighted");
  if (selectionState.squareNum === null) {
    return;
  }
  const selectedSquare = getSquareByNum(selectionState.squareNum)
  const dir = selectionState.vertical ? 'd' : 'a';
  const clueNum = selectedSquare.attr(`data-dir-${dir}`);
  selectedSquare.addClass("selected");
  $(`div[data-dir-${dir}='${clueNum}']`).addClass("highlighted");
}
