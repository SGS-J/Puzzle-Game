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
    ready: new State("ready", () => {
      app.button.textContent = "Play!";
      app.button.removeEventListener("click", app.gameEvent.undo);
      app.button.addEventListener("click", app.gameEvent.initGame);
    }),

    playing: new State("playing", () => {
      let count = 0;
      this.timer = setInterval(() => {
        ++count;
        this.timeScore = count;
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

    win: new State("win", () => {
      clearInterval(this.timer);
      // Removes listeners from img in board
      Array.from(app.figures).forEach((fig) => {
        if (fig.localName !== "div")
          fig.removeEventListener("click", (e) =>
            app.gameEvent.moveGrid(e.target)
          );
      });
      if (localStorage.getItem("score")) {
        let scoreSaved = localStorage.getItem("score");
        localStorage.setItem(
          "score",
          `${scoreSaved < this.timeScore ? this.timeScore : scoreSaved}`
        );
      } else {
        localStorage.setItem("score", this.timeScore);
      }
      app.showWinDialog();
    }),
  };

  setState(state) {
    this.actualState = state;
  }
}
