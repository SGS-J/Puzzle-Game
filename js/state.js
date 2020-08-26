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
    this.hasPlayed = false;
  }

  static states = {
    /////////// READY
    ready: new State("ready", () => {
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

      app.gameState.hasPlayed = true;

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
      const scoreSaved = parseInt(localStorage.getItem("score"));

      if (app.gameState.timeScore < scoreSaved) {
        localStorage.setItem("score", app.gameState.timeScore);
      }
      if (app.gameState.hasPlayed) {
        localStorage.setItem("score", app.gameState.timeScore);
      }

      clearInterval(this.timer);

      // Removes listeners from img in board
      Array.from(app.figures).forEach((fig) => {
        if (fig.localName !== "div")
          fig.removeEventListener("click", (e) =>
            app.gameEvent.moveGrid(e.target)
          );
      });

      app.showWinDialog();
    }),
  };

  setState(state) {
    this.actualState = state;
  }
}
