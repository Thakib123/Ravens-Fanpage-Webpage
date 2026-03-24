function MakeRosterR_CGF() {
    return (
        <div>
            <h1>Baltimore Ravens Roster</h1>
            <MakeRosterR 
                position="Quarterback" 
                positiondet="Leads the offense by passing, handing off, and making play decisions." 
                imgSrc="pics/lamar.jpg"
                imgObjList={[
                    { display: "Quarterback", val: "pics/lamar.jpg" },
                    { display: "Running Back", val: "pics/dhen.jpg" },
                    { display: "Wide Receiver", val: "pics/allen.jpg" }
                ]}
            />
            <br></br>
            <MakeRosterR 
                position="Running Back" 
                positiondet="Runs the ball, catches short passes, and blocks for the quarterback." 
                imgSrc="pics/dhen.jpg"
                imgObjList={[
                    { display: "Running Back", val: "pics/dhen.jpg" },
                    { display: "Wide Receiver", val: "pics/allen.jpg" },
                    { display: "Quarterback", val: "pics/lamar.jpg" }
                ]}    
            />
            <br></br>
            <MakeRosterR 
                position="Wide Receiver" 
                positiondet="Runs routes, catches passes, and evades defenders." 
                imgSrc="pics/allen.jpg"
                imgObjList={[
                    { display: "Wide Receiver", val: "pics/allen.jpg" },
                    { display: "Quarterback", val: "pics/lamar.jpg" },
                    { display: "Running Back", val: "pics/dhen.jpg" }
                ]}
            />
            <br></br>
            <MakeRosterR
                position="Unknown" 
                positiondet="No details available." 
                imgSrc="default.jpg"
                imgObjList={[]} // Empty list to ensure it's fully blank
            />
        </div>
    );
}

// Define it globally so it works inside the browser
window.MakeRosterR_CGF = MakeRosterR_CGF;
