import {Project} from "./project.js"; 

const gameArea = document.querySelector("#gameArea");
const coordDisplay = document.querySelector("#coordDisplay");
const MainProject = new Project("DJ Ricochet", 480, 360, {
    backgroundColor: "#b6a3ff"
}, gameArea);
MainProject.state.page = 0;
MainProject.state.tutorial = true;
MainProject.state.settings = {
 backgroundMusic: true, 
 trailColor: 0, 
 floatEffect: true 
};
MainProject.context.drawImage(MainProject.images["splashscreen"], 0, 0, 480, 360);
MainProject.context.fillStyle = "white";
MainProject.context.font = "22px Monospace";
MainProject.context.textAlign = "center";
MainProject.context.textBaseline = "middle";
MainProject.context.fillText("Loading...", 240, 320);

gameArea.addEventListener("click", function(event){
 if (MainProject.loaded && !MainProject.started) {
  MainProject.start(); 
  let theme = Project.Main.audio["please-be-nice"]; 
   if (!theme.currentTime) {               
    Project.Main.audio["please-be-nice"].start(function() {
    Project.Main.audio["please-be-nice"].start();
   });
  }
 } 
  Project.Main.connectUserEvent(event);
});
window.addEventListener("keydown", function(event){
  Project.Main.connectUserEvent(event);
});
gameArea.addEventListener("mousemove", function(event) {
    Project.Main.connectUserEvent(event);
    Project.Main.userProperties.mouse.x = event.pageX - Project.Main.width/2;
    Project.Main.userProperties.mouse.y = event.pageY - Project.Main.height/2;
    //coordDisplay.innerText = `x:${Project.Main.userProperties.mouse.x}, y:${Project.Main.userProperties.mouse.y}`;
});

await import("./sprites/mainMenu.js");
await import("./sprites/help.js");
await import("./sprites/options.js");
await import("./sprites/level.js");

setTimeout(function() {
MainProject.context.clearRect(0, 0, gameArea.width, gameArea.height);
MainProject.context.drawImage(MainProject.images["splashscreen"], 0, 0, 480, 360);
MainProject.context.fillText("Click the screen to play!", 240, 320);
MainProject.loaded = true; 
}, 8000);
