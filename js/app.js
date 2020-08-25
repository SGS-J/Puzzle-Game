var app = {
  button: document.querySelector("footer button"),
  imgPanel: document.querySelector(".panel-img"),
  figures: document.querySelectorAll(".panel-img img, .panel-img div"),
  gameLogic: new GameLogic(),
  gameEvent: new GameEvent(),
  gameState: new GameState(GameState.states.ready)
};

app.button.addEventListener("click", app.gameEvent.initGame);
app.figures.forEach((fig) => {
  fig.addEventListener("dragstart", e => {
    e.preventDefault();
  })
});
app.gameState.actualState.initProcess();