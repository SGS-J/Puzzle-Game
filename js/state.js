class State {
   constructor(name, func) {
      this.name = name;
      this.cllBack = func;
   }

   

   getName() {
      return this.name;
   }
}

class GameState {
  constructor(state = GameState.states) {
    this.actualState = state;
    this.timer = () => setInterval(() => {}, 1000);
  }

  static states = {
    ready: "ready",
    playing: "playing",
    win: "win",
  };

  dispatchState() {
    switch (this.actualState) {
      case GameState.states.ready:
         app.gameEvent.begin()
        break;
      case GameState.states.playing:
        break;
      case GameState.states.win:
        break;
    }
  }

  setState(state) {
    this.actualState = state;
  }
}
