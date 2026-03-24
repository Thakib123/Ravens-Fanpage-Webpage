// _React_reusable/MakeRavensGameListR.js
"use strict";

const MakeRavensGameListR = ({
  gameList = [{}],
  title = "Untitled Ravens Game List",
  venue = "Unknown Venue"
}) => {
  const [sortField, setSortField] = React.useState("gameDate");

  const sortedList = [...gameList].sort((a, b) => {
    if (sortField === "gameDate") {
      return new Date(a.gameDate) - new Date(b.gameDate); // Oldest to newest
    } else if (sortField === "scoreSummary") {
      const getRavensScore = (score) => {
        if (!score || typeof score !== "string") return 0;

        const match = score.match(/^(\d+)-(\d+)/);
        if (match) {
          return parseInt(match[1]); // Assumes Ravens score is first
        }
        return 0;
      };

      return getRavensScore(b.scoreSummary) - getRavensScore(a.scoreSummary); // High to low
    }
    return 0;
  });

  const MakeRavensGameR = ({
    imageList = [],
    gameDate = "No Date",
    opponent = "Unknown Opponent",
    scoreSummary = "No Score",
  }) => {
    const defaultImage = "images/default_ravens_game.jpg";
    const [imgSrc, setImgSrc] = React.useState(
      imageList.length > 0 ? imageList[0].fileName : defaultImage
    );
    const [opponentState, setOpponentState] = React.useState(opponent);
    const [scoreState, setScoreState] = React.useState(scoreSummary);
  
    return (
      <div className="ravensGameList-card">
        <h4>Ravens {gameDate} vs {opponentState}</h4>
        <img src={imgSrc} alt="game" width="250" />
        <p>Final Score: {scoreState}</p>
  
        <div className="editSection">
          <label>Edit Opponent:</label>
          <input
            type="text"
            value={opponentState}
            onChange={(e) => setOpponentState(e.target.value)}
          />

          <label>Edit Score:</label>
          <input
            type="text"
            value={scoreState}
            onChange={(e) => setScoreState(e.target.value)}
          />
        </div>
  
        {imageList.length > 1 && (
          <select value={imgSrc} onChange={(e) => setImgSrc(e.target.value)}>
            {imageList.map((img, i) => (
              <option key={i} value={img.fileName}>
                {img.imgName}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };
  

  return (
    <div className="ravensGameList">
      <h3>{title}</h3>
      <p>Venue: {venue}</p>
      <div>
        <strong>Sort By:</strong>
        <button onClick={() => setSortField("gameDate")}>Game Date</button>
        <button onClick={() => setSortField("scoreSummary")}>Score</button>
      </div>
      {sortedList.map((game, index) => (
        <MakeRavensGameR key={index} {...game} />
      ))}
    </div>
  );
};
