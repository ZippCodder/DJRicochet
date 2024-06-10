const IMAGES = {};
const AUDIO = {};

function ImageAsset(name, width, height, src) {
    return new Promise((res, rej) => {
        let image = new Image(width, height);
        image.src = src;
        image.onload = () => {
            IMAGES[name] = image;
            res(image);
        }
    });
}

function AudioAsset(name, src) {
    return new Promise((res, rej) => {
        let audio = new Audio(src);
        image.oncanplaythrough = () => {
            AUDIO[name] = audio;
            res(audio);
        }
    });
}

await ImageAsset("ProbabIy_Not", 480, 360, "/public/Titles/costumes/ProbabIy_Not.png");
await ImageAsset("Title_1", 480, 360, "/public/Titles/costumes/Title_1.png");
await ImageAsset("Click_Anywhere_To_Start", 280, 100, "/public/Titles/costumes/Click_Anywhere_To_Start.png");
await ImageAsset("Foreground", 480, 360, "/public/Foreground/costumes/Foreground.png");
await ImageAsset("Background_Art", 480, 360, "/public/Grid/costumes/Background_Art.png");
await ImageAsset("Backlight", 480, 72, "/public/Grid/costumes/Backlight.png");
await ImageAsset("Backlight_2", 480, 360, "/public/Grid/costumes/Backlight_2.png");
await ImageAsset("Help", 460, 80, "/public/Menu/costumes/Help.png");
await ImageAsset("Help_2", 460, 80, "/public/Menu/costumes/Help_2.png");
await ImageAsset("Options", 460, 80, "/public/Menu/costumes/Options.png");
await ImageAsset("Options_2", 460, 80, "/public/Menu/costumes/Options_2.png");
await ImageAsset("Resume", 180, 80, "/public/Menu/costumes/Resume.png");
await ImageAsset("Resume_2", 180, 80, "/public/Menu/costumes/Resume_2.png");
await ImageAsset("Play", 144, 50, "/public/Menu/costumes/Play.png");
await ImageAsset("Play_2", 144, 50, "/public/Menu/costumes/Play_2.png");
await ImageAsset("Headphones_Recommended", 340, 120, "/public/Titles/costumes/Headphones_Recommended.png");
await ImageAsset("Controls", 460, 160, "/public/Submenu/costumes/Controls.png");
await ImageAsset("Break_Line", 460, 80, "/public/Submenu/costumes/Break_Line.png");
await ImageAsset("Functions", 460, 160, "/public/Submenu/costumes/Functions.png");
await ImageAsset("Close", 55, 55, "/public/Submenu/costumes/Close.png");

export {
    IMAGES,
    AUDIO
};
