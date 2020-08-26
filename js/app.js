const app = {
  button: document.querySelector("footer button"),
  imgPanel: document.querySelector(".panel-img"),
  figures: document.querySelectorAll(".panel-img img, .panel-img div"),
  timer: document.querySelector("footer .timer"),
  score: document.querySelector("footer .best-time"),
  gameLogic: new GameLogic(),
  gameEvent: new GameEvent(),
  gameState: new GameState(GameState.states.ready),
  showWinDialog: () => {

  }
};

app.figures.forEach((fig) => {
  fig.addEventListener("dragstart", e => {
    e.preventDefault();
  })
});
app.gameState.actualState.initProcess();