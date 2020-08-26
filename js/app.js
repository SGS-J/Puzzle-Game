const app = {
  button: document.querySelector("footer #foot-btn"),
  imgPanel: document.querySelector(".panel-img"),
  figures: document.querySelectorAll(".panel-img img, .panel-img div"),
  timer: document.querySelector("footer .timer"),
  score: document.querySelector("footer .best-time"),
  winDialog: document.querySelector("#win-dialog"),
  gameLogic: new GameLogic(),
  gameEvent: new GameEvent(),
  gameState: new GameState(GameState.states.ready),
  showWinDialog: () => {
    app.winDialog.setAttribute(
      "style",
      "transform: translateY(0);" + "opacity: 1;" + "z-index: 100"
    );
    app.winDialog.querySelector(
      "p"
    ).textContent = `Time: ${app.gameState.timeScore}s`;
  },
  hideWinDialog: () => {
    app.winDialog.setAttribute(
      "style",
      "transform: translateY(-20%);" + "opacity: 0;" + "z-index: -1"
    );
  },
};

app.winDialog.querySelector("#btn-restart").addEventListener("click", () => {
  app.gameState.setState(GameState.states.ready);
  app.hideWinDialog();
  app.gameState.actualState.initProcess();
});

app.figures.forEach((fig) => {
  fig.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
});

localStorage.setItem("score", "0");
app.gameState.actualState.initProcess();
