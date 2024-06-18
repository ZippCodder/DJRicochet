import Project from "./project.js"; 

const gameArea = document.querySelector("#gameArea");
const coordDisplay = document.querySelector("#coordDisplay");
const MainProject = new Project("DJ Ricochet", 480, 360, {
    backgroundColor: "#b6a3ff"
}, gameArea);
gameArea.addEventListener("click", function(event){
  Project.Main.connectUserEvent(event);
});
gameArea.addEventListener("mousemove", function(event) {
    Project.Main.connectUserEvent(event);
    Project.Main.userProperties.mouse.x = event.pageX - Project.Main.width/2;
    Project.Main.userProperties.mouse.y = event.pageY - Project.Main.height/2;
    coordDisplay.innerText = `x:${Project.Main.userProperties.mouse.x}, y:${Project.Main.userProperties.mouse.y}`;
});

import("./sprites/mainMenu.js");
import("./sprites/help.js");

MainProject.start();
