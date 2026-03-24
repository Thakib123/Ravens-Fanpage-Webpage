function TwoEditAreas_CGF() {
    const ele = document.createElement("div");
    ele.appendChild(GameStatsEditArea_CGF());
    ele.appendChild(PlayerProfileEditArea_CGF());
    return ele;
  }
  