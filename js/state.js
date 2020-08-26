class State {
  constructor(name, process) {
    this.name = name;
    this.process = process;
  }

  initProcess() {
    this.process();
  }

  getName() {
    return this.name;
  }
}

class GameState {
  constructor(state) {
    this.actualState = state;
    this.timer = null;
    this.timeScore = 0;
  }

  static states = {
    /////////// READY
    ready: new State("ready", () => {
      app.hideWinDialog();
      app.button.textContent = "Play!";
      app.button.removeEventListener("click", app.gameEvent.undo);
      app.button.addEventListener("click", app.gameEvent.initGame);
      app.timer.textContent = "Time: 0";
      app.score.textContent = `Best time: ${localStorage.getItem("score")}s`;
    }),

    /////////// PLAYING
    playing: new State("playing", () => {
      let count = 0;
      this.timer = setInterval(() => {
        ++count;
        app.gameState.timeScore = count;
        app.timer.textContent = `Time: ${count}`;
      }, 1000);

      app.button.textContent = "Undo";
      app.button.removeEventListener("click", app.gameEvent.initGame);
      app.button.addEventListener("click", app.gameEvent.undo);

      // Add listeners to img in board
      Array.from(app.figures).forEach((fig) => {
        if (fig.localName !== "div")
          fig.addEventListener("click", (e) =>
            app.gameEvent.moveGrid(e.target)
          );
      });
    }),

    /////////// WIN
    win: new State("win", () => {
      clearInterval(this.timer);
      // Removes listeners from img in board
      Array.from(app.figures).forEach((fig) => {
        if (fig.localName !== "div")
          fig.removeEventListener("click", (e) =>
            app.gameEvent.moveGrid(e.target)
          );
      });
      let scoreSaved = localStorage.getItem("score");
      if(this.timeScore > parseInt(scoreSaved)) {
        localStorage.setItem("score", this.timeScore);
      } else {
        localStorage.setItem("score", scoreSaved);
      }
      app.showWinDialog();
    }),
  };

  setState(state) {
    this.actualState = state;
  }
}
