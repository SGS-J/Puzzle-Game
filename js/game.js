class GameLogic {
  constructor() {
    this.grid = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    this.gridSorted = [];
    this.undoElements = [];
    this.iEmpty = { row: 3, col: 3 };
    this.nextToEmpty = [];
    this.createGridSorted();
  }

  createGridSorted() {
    let count = 1;
    while (count < 17) {
      this.gridSorted.push(count);
      ++count;
    }
  }

  isMovable(pos) {
    let row = this.grid.findIndex((r) => r.some((num) => num == pos));
    let col = this.grid[row].findIndex((num) => num == pos);
    let movable = this.nextToEmpty.some((posit) => {
      return posit[0] == row && posit[1] == col;
    });
    return movable;
  }

  won() {
    let iForSort = 0;
    const won = this.grid.every((row) =>
      row.every((col) => {
        if(col == this.gridSorted[iForSort]){
          ++iForSort;
          return true;
        }
      })
    );
    return won;
  }

  uploadGrid() {
    let iForOrder = 0;
    this.grid.forEach((pos) => {
      pos.forEach((num, i) => {
        if (iForOrder < 16) {
          pos[i] = AppUtil.getGridPosition(app.figures[iForOrder]);
          ++iForOrder;
        }
      });
    });
  }

  flipWithEmpty(elemToFlip) {
    let empty = document.querySelector(".empty-block");
    let childs = Array.from(elemToFlip.parentElement.children);
    let emptyIndex = childs.findIndex(
      (el) => AppUtil.getGridPosition(el) === 16 // 16 = Empty block position
    );
    let elemIndex = childs.findIndex(
      (el) =>
        AppUtil.getGridPosition(el) === AppUtil.getGridPosition(elemToFlip)
    );
    childs[elemIndex] = empty;
    childs[emptyIndex] = elemToFlip;
    childs.forEach((child) => {
      elemToFlip.parentElement.appendChild(child);
    });
  }

  addUndoElement(elem) {
    this.undoElements.push(elem);
  }

  setEmptyPos() {
    this.iEmpty.row = this.grid.findIndex((grid) =>
      grid.some((num) => num == 16)
    );
    this.iEmpty.col = this.grid[this.iEmpty.row].findIndex((num) => num == 16);
  }

  setNextToEmpty() {
    this.nextToEmpty = [];
    this.grid.forEach((actualGrid, i) => {
      if (i == this.iEmpty.row) {
        this.nextToEmpty.push([
          i,
          actualGrid.findIndex((num, i) => i + 1 == this.iEmpty.col),
        ]);
        this.nextToEmpty.push([
          i,
          actualGrid.findIndex((num, i) => i - 1 == this.iEmpty.col),
        ]);
      } else if (this.iEmpty.row + 1 == i || this.iEmpty.row - 1 == i) {
        this.nextToEmpty.push([
          i,
          actualGrid.findIndex((num, i) => i == this.iEmpty.col),
        ]);
      }
    });
  }
}
