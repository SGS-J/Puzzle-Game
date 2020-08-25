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
  constructor(state = GameState.states) {
    this.actualState = state;
    this.timer = null;
  }

  static states = {
    ready: new State("ready", () => {
      app.button.textContent = "Play!";
    }),

    playing: new State("playing", () => {
      let count = 0;
      this.timer = setInterval(() => {
        document.querySelector(".result").textContent = count;
        ++count;
      }, 1000);
      app.button.textContent = "Undo";
      app.button.removeEventListener("click", app.gameEvent.initGame);
      app.button.addEventListener("click", app.gameEvent.undo);
      Array.from(app.figures).forEach((fig) => {
        if (fig.localName !== "div")
          fig.addEventListener("click", (e) =>
            app.gameEvent.moveGrid(e.target)
          );
      });
    }),

    win: new State("win", () => {
      clearInterval(this.timer);
      document.querySelector(".result").textContent = "You win!";
    }),
  };

  setState(state = GameState.states) {
    this.actualState = state;
  }
}
