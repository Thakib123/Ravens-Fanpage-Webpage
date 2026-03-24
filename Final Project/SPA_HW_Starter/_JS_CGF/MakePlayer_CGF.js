"use strict"; // Prevent browser from globally auto-declaring variables

function MakePlayer_CGF() {
    var ele = document.createElement("div");

    // Create first player with all properties specified
    var player1 = MakePlayer({
        playerName: "LeBron James",
        touchdowns: 20,
        imgSrc: "pics/bron.jpg",
        imgObjList: [
            { display: "LeBron James", val: "pics/bron.jpg" },
            { display: "Sally K", val: "pics/sallyk.jpg" }
        ]
    });
    ele.appendChild(player1);

    // Create second player with different values
    var player2 = MakePlayer({
        playerName: "Patrick Mahomes",
        touchdowns: 5,
        imgSrc: "pics/mahomes.jpg",
        imgObjList: [
            { display: "Patrick Mahomes", val: "pics/mahomes.jpg" },
            { display: "Josh Allen", val: "pics/allen.jpg" }
        ]
    });
    ele.appendChild(player2);

    // Create third player with an empty object to test default values
    var player3 = MakePlayer({});
    ele.appendChild(player3);

    var player4 = MakePlayer({
        playerName: "Lamar Jackson",
        touchdowns: 15,
        imgSrc: "pics/lamar.jpg",
        imgObjList: [
            { display: "Lamar Jackson", val: "pics/lamar.jpg" },
            { display: "Jalen Hurts", val: "pics/hurts.jpg" }
        ]
    });
    ele.appendChild(player4);

    return ele;
}
