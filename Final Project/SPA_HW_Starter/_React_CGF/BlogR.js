"use strict";
function BlogR() {
    return (
        <div className="blog" style={{ marginTop: "20px" }}>
            <h1 style={{ marginBottom: "20px" }}>Blog</h1>
            <h2>My Proposed Data</h2>
            <p>
                Click <a target="_blank" href="json/ravens_regular_season_stats.json">here</a> to see my JSON file
            </p>

            <h2>My Web Dev Exp</h2>
            <p>Creating this website has been an exciting journey in applying HTML and CSS to real-world data.
                Its been fun combining football with technical skills!
            </p>

            <h2>Blog HW01 Homepage</h2>
            <p>The easy part of making this webpage was the creating the background color and changing the font because I
                just had to do this for the lab activity.
                Something I found hard was designing the CSS of the website and making sure that everything fits and that my
                website works on a phone screen and a half window.
                Even though it was hard, I like learning how to structure a website and integrate data dynamically.
            </p>
            <br></br>
            <h2>Blog HW02 Blog</h2>
            <p>Creating the background color and changing the font was easy because I had already practiced it in a previous lab activity. 
                However, designing the CSS layout and ensuring everything fit properly on different screen sizes, 
               like a phone or a half-window, was more challenging. Making the website responsive required extra effort and testing to adjust elements correctly. Despite the difficulty, I enjoyed learning how to structure a webpage and 
               dynamically integrate data. Overall, this assignment was a mix of familiar tasks and new challenges that helped me improve my web development skills.
            </p>
            <br></br>
            <h2>Blog HW03 Player Objects</h2>
            <p>This assignment was challenging because managing dynamic updates in JavaScript, especially keeping track of individual player statistics while switching images, required careful handling of state. 
                Ensuring that the touchdown count reset visually while maintaining individual scores was tricky since the UI needed to reflect changes instantly. 
                Debugging JSON formatting errors and making sure images loaded correctly also took time, as small syntax mistakes caused unexpected issues. 
                However, implementing the React Router and setting up navigation was relatively easy since it followed a familiar structure from previous assignments. 
                Overall, while the logic for updating player stats dynamically was difficult, structuring the project and integrating the UI with JavaScript was straightforward.
            </p>
            <br></br>
            <h2>Blog HW04 React Obj Comp</h2>
            <p>This assignment was particularly challenging because it required managing state changes dynamically within React while ensuring that the correct responsibilities 
                updated based on the selected position. One of the biggest hurdles was figuring out how to link the dropdown selection to both the image and the corresponding responsibilities,
                 as React state needs to be updated properly for the changes to reflect instantly. Additionally, keeping track of multiple props, such as position details and image lists, required 
                 careful structuring to avoid errors. Debugging was also a challenge, especially when ensuring that the correct values were displayed after an update. However, the styling was by far 
                 the easiest part of the assignment, as it mainly involved adjusting spacing, colors, and layout to make the roster visually appealing without affecting the functionality. Overall, while the 
                 logic and state management were difficult to implement,the project helped reinforce my understanding of React’s useState and event handling.
            </p>
            <br></br>
            <h2>Blog HW05 Slide Show/AJAX</h2>
            <p>The hardest part of this assignment was mapping the JSON data to match the expected fields in MakeSlideShow, while ensuring the Hide/Show button worked correctly without breaking the layout
                , but the easier part was implementing the basic slideshow functionality, as the navigation logic was straightforward.
                Here's my first JSON Link: <a target="_blank" href="json/Lamar.json">Lamar.json</a> and this is the second one:
                <a target="_blank" href="json/Derrick.json">Derrick.json</a>
            </p>
            <br></br>
            <h2>Blog HW06 JS Obj List Comp</h2>
            <p>This assignment was both challenging and rewarding, pushing me to apply my JavaScript, JSON handling, and CSS skills in a more dynamic and interactive way. One of the biggest difficulties was integrating AJAX 
                to fetch data from multiple JSON files and ensuring the data was properly formatted for use in the application. 
                Debugging issues related to incorrect JSON structure, missing properties, and image paths required careful troubleshooting through console logs and browser Developer Tools. Overall, this project helped strengthen
                 my ability to work with JSON data, manipulate the DOM dynamically, and build interactive user interfaces, all of which are essential skills for front-end development. While it was frustrating at times, 
                 successfully solving these problems gave me a better understanding of how modern web applications handle data and user input.
            </p>
            <br></br>
            <h2>Blog HW07 React Object List Component</h2>
            <p>This module helped me learn how to build a dynamic React component that renders a list of Ravens games using data from JSON files. 
                It was easy to create the individual game components once I understood how to use props and default values. 
                The hardest part was handling sorting logic for score values that were stored as strings. 
                I found it valuable to see how React components can be reused and customized for different data sources with just a few changes.</p>
            <br></br>
            <h2>Blog HW08 Input Component</h2>
            <p>This homework helped me build reusable input components with field validation, including radio buttons, required fields, and responsive styling. 
                The most challenging part was getting radio groups to validate properly, especially the required one with no pre-selection. 
                Overall, I learned a lot about how to structure forms in JavaScript and make them dynamic and user-friendly.</p>
            <br></br>
            <h2>Blog HW09 Editable Lists</h2>
            <p>For this assignment, I created a flexible, reusable CRUD component that lets users insert, edit, and delete objects from a list using JSON data related to the Ravens. 
                I found it easy to customize the template and make each item visually consistent, but getting the layout to play nicely with my fixed header was tricky. It was also helpful to practice using modal edit areas and applying different types of validation rules. 
                Overall, this assignment helped me understand how to make more dynamic and user-driven components.</p>
            <br></br>
            <img src="pics/Lamar_01.jpg" />
        </div>
    );
}