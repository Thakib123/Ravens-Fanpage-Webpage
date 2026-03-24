"use strict"; 
const { useState } = React;

function MakeRosterR({ 
    position = "Unknown Position", 
    positiondet = "No position details available", 
    imgSrc = "default.jpg",
    imgObjList = []
}) {
    const [selectedImg, setSelectedImg] = useState(imgSrc);
    const [responsibilities, setResponsibilities] = useState(positiondet);
    const [totalPlays, setTotalPlays] = useState(0); 

    const positionResponsibilities = {
        "Quarterback": "Leads the offense by passing, handing off, and making play decisions.",
        "Running Back": "Runs the ball, catches short passes, and blocks for the quarterback.",
        "Wide Receiver": "Runs routes, catches passes, and evades defenders."
    };

    return (
        <div className="roster-card">
            <h3>Position: {position}</h3>
            <img src={selectedImg} alt={position} />
            <p>Responsibilities: {responsibilities}</p>
            <p>Total Plays: {totalPlays}</p>

            <select 
                onChange={(e) => {
                    setSelectedImg(e.target.value);
                    setResponsibilities(positionResponsibilities[e.target.options[e.target.selectedIndex].text] || "No details available.");
                }} 
                className="selectImages"
            >
                {imgObjList.map((imgObj, index) => (
                    <option key={index} value={imgObj.val}>{imgObj.display}</option>
                ))}
            </select>

          
            <div className="button-container">
                <button onClick={() => setResponsibilities("Updated position responsibilities!")}>
                    Update Responsibilities
                </button>

                <button onClick={() => setTotalPlays(totalPlays + 1)}>
                    Add a Play
                </button>
            </div>
        </div>
    );
}

// Make global
window.MakeRosterR = MakeRosterR;
