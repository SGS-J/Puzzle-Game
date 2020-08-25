var app = {
  buttons: document.querySelectorAll("footer button"),
  imgPanel: document.querySelector(".panel-img"),
  figures: document.querySelectorAll(".panel-img img, .panel-img div"),
  gameLogic: new GameLogic(),
  gameEvent: new GameEvent(),
  gameState: new GameState(GameState.states.ready)
};

app.buttons[0].addEventListener("click", app.gameEvent.undo);
app.buttons[1].addEventListener("click", app.gameEvent.restart);
app.figures.forEach((fig) => {
  fig.addEventListener("dragstart", e => {
    e.preventDefault();
  })
  if (fig.localName !== "div")
    fig.addEventListener("click", (e) => app.gameEvent.moveGrid(e.target));
});
app.gameState.dispatchState();