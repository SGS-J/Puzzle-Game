class GameEvent {
  constructor() {
    this.initGame = () => {
      AppUtil.shuffleNodes(app.figures);
      app.figures = document.querySelector("main .panel-img").children;
      app.gameLogic.uploadGrid();
      app.gameLogic.setEmptyPos();
      app.gameLogic.setNextToEmpty();
      app.gameState.setState(GameState.states.playing);
      app.gameState.actualState.initProcess();
    };

    this.moveGrid = (elem, type = "normal") => {
      let position = AppUtil.getGridPosition(elem);
      if (app.gameLogic.isMovable(position)) {
        app.gameLogic.flipWithEmpty(elem);
        app.gameLogic.uploadGrid();
        if (app.gameLogic.won()) {
          app.gameState.setState(GameState.states.win);
          app.gameState.actualState.initProcess();
        } else {
          if (type === "normal") app.gameLogic.addUndoElement(elem);
          app.gameLogic.setEmptyPos();
          app.gameLogic.setNextToEmpty();
        }
      }
    };

    this.undo = () => {
      if (app.gameLogic.undoElements.length > 0) {
        this.moveGrid(app.gameLogic.undoElements.pop(), "undo");
      }
    };
  }
}
