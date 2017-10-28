var selectionState = {
  squareNum: null,
  vertical: true
}

function setUpHandlers() {
  $(".puzzSquare:not(.black)").click(evt => {
      const square = $(evt.currentTarget);
      selectionState.squareNum = square.data('squarenum');

      updateSelectionUI();
  });
}

function getSquareByNum(num) {
  return $(`div[data-squareNum='${num}']`);
}

function updateSelectionUI() {
  $(".selected").removeClass("selected");
  if (selectionState.squareNum === null) {
    return;
  }
  const selectedSquare = getSquareByNum(selectionState.squareNum)
  const clueNum = selectedSquare.attr('data-dir-A');
  $(`div[data-dir-A='${clueNum}']`).addClass("selected");
}
