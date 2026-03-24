"use strict";

const MakeRavensGameList_CGF = () => {
  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);

  React.useEffect(() => {
    fetch("json/ravensGames1.json")
      .then((res) => res.json())
      .then((data) => setData1(data.ravensGames || []));

    fetch("json/ravensGames2.json")
      .then((res) => res.json())
      .then((data) => {
        const converted = data.games.map((g) => ({
          gameDate: g.date,
          opponent: g.vs,
          scoreSummary: g.score,
          imageList: g.images,
        }));
        setData2(converted);
      });
  }, []);

  return (
    <div>
      <MakeRavensGameListR
        gameList={data1}
        title="Historic Ravens Games"
        venue="M&T Bank Stadium"
      />
      <MakeRavensGameListR
        gameList={data2}
        title="Ravens Road Games"
        venue="Various Away Venues"
      />
      <MakeRavensGameListR
        gameList={[]} 
        title="Empty Game List"
        venue="No Venue Available"
      />
    </div>
  );
};
