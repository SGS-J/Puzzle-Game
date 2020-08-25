class AppUtil {
  static shuffle(array = []) {
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
    array.sort(() => Math.random() - 0.5);
  }

  static shuffleNodes(nodeList) {
    let positions = Array.from(nodeList).map((el, i) => i);
    let parent = nodeList[0].parentElement;
    let len = nodeList.length;
    this.shuffle(positions);
    positions.forEach(pos => {
      if(pos !== len)
        parent.appendChild(nodeList[pos]);
    })
  }

  static getGridPosition(target) {
    return parseInt(
      target.getAttribute("id")
    );
  }
}