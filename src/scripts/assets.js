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
        audio.start = function(callback) {
            if (callback) audio.onended = callback;
            audio.play();
        }
        audio.playClone = function() {
            let clone = audio.cloneNode();
            clone.onended = function() {
                clone.remove();
            }
            clone.play();
        }
        audio.oncanplaythrough = () => {
            AUDIO[name] = audio;
            res(audio);
        }
    });
}

await Promise.all([ImageAsset("ProbabIy_Not", 480, 360, "/public/Titles/costumes/ProbabIy_Not.png"),
    ImageAsset("splashscreen", 640, 480, "/public/Stage/costumes/splashscreen.png"),
    ImageAsset("Title_1", 480, 360, "/public/Titles/costumes/Title_1.png"),
    ImageAsset("Click_Anywhere_To_Start", 280, 100, "/public/Titles/costumes/Click_Anywhere_To_Start.png"),
    ImageAsset("Foreground", 480, 360, "/public/Foreground/costumes/Foreground.png"),
    ImageAsset("Background_Art", 480, 360, "/public/Grid/costumes/Background_Art.png"),
    ImageAsset("Backlight", 480, 72, "/public/Grid/costumes/Backlight.png"),
    ImageAsset("Backlight_2", 480, 360, "/public/Grid/costumes/Backlight_2.png"),
    ImageAsset("Help", 460, 80, "/public/Menu/costumes/Help.png"),
    ImageAsset("Help_2", 460, 80, "/public/Menu/costumes/Help_2.png"),
    ImageAsset("Options", 460, 80, "/public/Menu/costumes/Options.png"),
    ImageAsset("Options_2", 460, 80, "/public/Menu/costumes/Options_2.png"),
    ImageAsset("Resume", 180, 80, "/public/Menu/costumes/Resume.png"),
    ImageAsset("Resume_2", 180, 80, "/public/Menu/costumes/Resume_2.png"),
    ImageAsset("Play", 144, 50, "/public/Menu/costumes/Play.png"),
    ImageAsset("Play_2", 144, 50, "/public/Menu/costumes/Play_2.png"),
    ImageAsset("Headphones_Recommended", 340, 120, "/public/Titles/costumes/Headphones_Recommended.png"),
    ImageAsset("Controls", 460, 160, "/public/Submenu/costumes/Controls.png"),
    ImageAsset("Break_Line", 460, 80, "/public/Submenu/costumes/Break_Line.png"),
    ImageAsset("Functions", 460, 160, "/public/Submenu/costumes/Functions.png"),
    ImageAsset("Close", 55, 55, "/public/Submenu/costumes/Close.png"),
    ImageAsset("Description_1", 300, 300, "/public/Descriptions/costumes/Description_1.png"),
    ImageAsset("Description_2", 300, 300, "/public/Descriptions/costumes/Description_2.png"),
    ImageAsset("Description_3", 480, 360, "/public/Descriptions/costumes/Description_3.png"),
    ImageAsset("Description_4", 480, 360, "/public/Descriptions/costumes/Description_4.png"),
    ImageAsset("Description_5", 480, 360, "/public/Descriptions/costumes/Description_5.png"),
    ImageAsset("Description_6", 480, 360, "/public/Descriptions/costumes/Description_6.png"),
    ImageAsset("Description_7", 480, 360, "/public/Descriptions/costumes/Description_7.png"),
    ImageAsset("Description_8", 480, 360, "/public/Descriptions/costumes/Description_8.png"),
    ImageAsset("Description_9", 480, 360, "/public/Descriptions/costumes/Description_9.png"),
    ImageAsset("Description_10", 480, 360, "/public/Descriptions/costumes/Description_10.png"),
    ImageAsset("Description_11", 480, 360, "/public/Descriptions/costumes/Description_11.png"),
    ImageAsset("Description_12", 480, 360, "/public/Descriptions/costumes/Description_12.png"),
    ImageAsset("Box", 480, 360, "/public/Descriptions/costumes/Box.png"),
    ImageAsset("Settings", 460, 160, "/public/Submenu/costumes/Settings.png"),
    ImageAsset("Credits", 460, 160, "/public/Submenu/costumes/Credits.png"),
    ImageAsset("On", 100, 100, "/public/Submenu/costumes/On.png"),
    ImageAsset("Off", 100, 100, "/public/Submenu/costumes/Off.png"),
    ImageAsset("Trail_Switch_1", 100, 100, "/public/Submenu/costumes/Trail_1.png"),
    ImageAsset("Trail_Switch_2", 100, 100, "/public/Submenu/costumes/Trail_2.png"),
    ImageAsset("Info", 100, 100, "/public/Submenu/costumes/Info.png"),
    ImageAsset("Info_2", 100, 100, "/public/Submenu/costumes/Info_2.png"),
    ImageAsset("Grid", 370, 202, "/public/Grid/costumes/Grid.png"),
    ImageAsset("Player_Arrow", 12, 18, "/public/PlayerArrow/costumes/Player_Arrow.png"),
    ImageAsset("Trail_1", 2, 14, "/public/PlayerArrow/costumes/Trail_1.png"),
    ImageAsset("Trail_2", 2, 14, "/public/PlayerArrow/costumes/Trail_2.png"),
    ImageAsset("01", 50, 50, "/public/Elements/costumes/01.png"),
    ImageAsset("02", 50, 50, "/public/Elements/costumes/02.png"),
    ImageAsset("03", 50, 50, "/public/Elements/costumes/03.png"),
    ImageAsset("04", 50, 50, "/public/Elements/costumes/04.png"),
    ImageAsset("05", 460, 80, "/public/Elements/costumes/05.png"),
    ImageAsset("06", 460, 80, "/public/Elements/costumes/06.png"),
    ImageAsset("07", 56, 56, "/public/Elements/costumes/07.png"),
    ImageAsset("08", 56, 56, "/public/Elements/costumes/08.png"),
    ImageAsset("09", 30, 26, "/public/Elements/costumes/09.png"),
    ImageAsset("10", 26, 30, "/public/Elements/costumes/10.png"),
    ImageAsset("11", 30, 26, "/public/Elements/costumes/11.png"),
    ImageAsset("12", 26, 30, "/public/Elements/costumes/12.png"),
    ImageAsset("13", 30, 24, "/public/Elements/costumes/13.png"),
    ImageAsset("14", 24, 30, "/public/Elements/costumes/14.png"),
    ImageAsset("15", 32, 32, "/public/Elements/costumes/15.png"),
    ImageAsset("16", 36, 36, "/public/Elements/costumes/16.png"),
    ImageAsset("17", 36, 36, "/public/Elements/costumes/17.png"),
    ImageAsset("18", 36, 36, "/public/Elements/costumes/18.png"),
    ImageAsset("19", 36, 36, "/public/Elements/costumes/19.png"),
    ImageAsset("20", 36, 36, "/public/Elements/costumes/20.png"),
    ImageAsset("21", 36, 36, "/public/Elements/costumes/21.png"),
    ImageAsset("22", 36, 36, "/public/Elements/costumes/22.png"),
    ImageAsset("23", 36, 36, "/public/Elements/costumes/23.png"),
    ImageAsset("33", 36, 36, "/public/Elements/costumes/33.png"),
    ImageAsset("34", 36, 36, "/public/Elements/costumes/34.png"),
    ImageAsset("35", 36, 36, "/public/Elements/costumes/35.png"),
    ImageAsset("36", 36, 36, "/public/Elements/costumes/36.png"),
    ImageAsset("37", 56, 56, "/public/Elements/costumes/37.png"),
    ImageAsset("38", 56, 56, "/public/Elements/costumes/38.png"),
    ImageAsset("39", 56, 56, "/public/Elements/costumes/39.png"),
    ImageAsset("40", 56, 56, "/public/Elements/costumes/40.png"),
    ImageAsset("Score", 150, 150, "/public/InGameMenu/costumes/Score.png"),
    ImageAsset("InGame_Break_Line", 80, 80, "/public/InGameMenu/costumes/Break_Line.png"),
    ImageAsset("InGame_Play", 60, 60, "/public/InGameMenu/costumes/Play.png"),
    ImageAsset("InGame_Play_2", 60, 60, "/public/InGameMenu/costumes/Play_2.png"),
    ImageAsset("InGame_Play_3", 60, 60, "/public/InGameMenu/costumes/Play_3.png"),
    ImageAsset("Help_Shortcut", 60, 60, "/public/InGameMenu/costumes/Help_Shortcut.png"),
    ImageAsset("Help_Shortcut_2", 60, 60, "/public/InGameMenu/costumes/Help_Shortcut_2.png"),
    ImageAsset("Help_Shortcut_3", 60, 60, "/public/InGameMenu/costumes/Help_Shortcut_3.png"),
    ImageAsset("Redo", 100, 100, "/public/InGameMenu/costumes/Redo.png"),
    ImageAsset("Redo_2", 100, 100, "/public/InGameMenu/costumes/Redo_2.png"),
    ImageAsset("Redo_3", 100, 100, "/public/InGameMenu/costumes/Redo_3.png"),
    ImageAsset("InGame_Hint", 100, 50, "/public/InGameMenu/costumes/Hint.png"),
    ImageAsset("InGame_Hint_2", 100, 50, "/public/InGameMenu/costumes/Hint_2.png"),
    ImageAsset("InGame_Hint_3", 100, 50, "/public/InGameMenu/costumes/Hint_3.png"),
    ImageAsset("Score_Box", 150, 150, "/public/Score/costumes/Score_Box.png"),
    ImageAsset("0", 150, 150, "/public/Score/costumes/0.png"),
    ImageAsset("1", 150, 150, "/public/Score/costumes/1.png"),
    ImageAsset("2", 150, 150, "/public/Score/costumes/2.png"),
    ImageAsset("3", 150, 150, "/public/Score/costumes/3.png"),
    ImageAsset("4", 150, 150, "/public/Score/costumes/4.png"),
    ImageAsset("5", 150, 150, "/public/Score/costumes/5.png"),
    ImageAsset("6", 150, 150, "/public/Score/costumes/6.png"),
    ImageAsset("7", 150, 150, "/public/Score/costumes/7.png"),
    ImageAsset("8", 150, 150, "/public/Score/costumes/8.png"),
    ImageAsset("9", 150, 150, "/public/Score/costumes/9.png"),
    ImageAsset("Score_Box", 150, 150, "/public/Score/costumes/Score_Box.png"),
    ImageAsset("Character", 200, 250, "/public/ProbabiyRaccoon/costumes/Character.png"),
    ImageAsset("Skip", 460, 320, "/public/ProbabiyRaccoon/costumes/Skip.png"),
    ImageAsset("Skip_2", 460, 320, "/public/ProbabiyRaccoon/costumes/Skip_2.png"),
    ImageAsset("Back_Block", 460, 80, "/public/Tutorial/costumes/Back_Block.png"),
    ImageAsset("Line_1", 460, 80, "/public/Tutorial/costumes/Line_1.png"),
    ImageAsset("Line_2", 460, 80, "/public/Tutorial/costumes/Line_2.png"),
    ImageAsset("Line_3", 460, 80, "/public/Tutorial/costumes/Line_3.png"),
    ImageAsset("Line_4", 460, 80, "/public/Tutorial/costumes/Line_4.png"),
    ImageAsset("Line_5", 460, 80, "/public/Tutorial/costumes/Line_5.png"),
    ImageAsset("Line_6", 460, 80, "/public/Tutorial/costumes/Line_6.png"),
    ImageAsset("Line_7", 460, 80, "/public/Tutorial/costumes/Line_7.png"),
    ImageAsset("Ripple", 40, 40, "/public/Ripple/costumes/Ripple.png"),
    AudioAsset("please-be-nice", "/public/Stage/sounds/please-be-nice.wav"),
    AudioAsset("card-swipe", "/public/Descriptions/sounds/card-swipe.wav"),
    AudioAsset("mouse-click", "/public/Menu/sounds/mouse-click-117076.wav"),
    AudioAsset("close-click", "/public/Submenu/sounds/050484501-menu-select-15.wav"),
    AudioAsset("jazy", "/public/Stage/sounds/jazy.wav"),
    AudioAsset("jazy2", "/public/Stage/sounds/jazy2.wav"),
    AudioAsset("endmusic", "/public/Stage/sounds/endmusic.wav"),
    ImageAsset("Hint_1", 480, 360, "/public/Hints/costumes/Hint_1.png"),
    ImageAsset("Hint_2", 480, 360, "/public/Hints/costumes/Hint_2.png"),
    ImageAsset("Hint_3", 480, 360, "/public/Hints/costumes/Hint_3.png"),
    ImageAsset("Hint_4", 480, 360, "/public/Hints/costumes/Hint_4.png"),
    ImageAsset("Hint_5", 480, 360, "/public/Hints/costumes/Hint_5.png"),
    ImageAsset("Hint_6", 480, 360, "/public/Hints/costumes/Hint_6.png"),
    ImageAsset("Hint_7", 480, 360, "/public/Hints/costumes/Hint_7.png"),
    ImageAsset("Hint_8", 480, 360, "/public/Hints/costumes/Hint_8.png"),
    ImageAsset("Hint_9", 480, 360, "/public/Hints/costumes/Hint_9.png"),
    ImageAsset("Hint_10", 480, 360, "/public/Hints/costumes/Hint_10.png"),
    ImageAsset("Hint_11", 460, 320, "/public/Hints/costumes/Hint_11.png"),
    ImageAsset("Hint_12", 460, 320, "/public/Hints/costumes/Hint_12.png"),
    ImageAsset("Hint_13", 460, 320, "/public/Hints/costumes/Hint_13.png"),
    ImageAsset("Hint_14", 460, 320, "/public/Hints/costumes/Hint_14.png"),
    ImageAsset("Hint_15", 460, 320, "/public/Hints/costumes/Hint_15.png"),
    ImageAsset("Hint_16", 460, 320, "/public/Hints/costumes/Hint_16.png"),
    ImageAsset("Hint_17", 460, 320, "/public/Hints/costumes/Hint_17.png"),
    ImageAsset("Hint_18", 460, 320, "/public/Hints/costumes/Hint_18.png"),
    ImageAsset("Hint_19", 460, 320, "/public/Hints/costumes/Hint_19.png"),
    AudioAsset("whoosh", "/public/Menu/sounds/whoosh-blow-flutter-shortwav-14678.wav"),
    AudioAsset("ding", "/public/Hints/sounds/ding-67618.wav"),
    AudioAsset("tape-player", "/public/PlayerArrow/sounds/tape-player-sounds-90780.wav"),
    AudioAsset("swoosh", "/public/Grid/sounds/swoosh-sound.wav"),
    AudioAsset("switch-off", "/public/Submenu/sounds/zapsplat_multimedia_button_click_004_78081.wav"),
    AudioAsset("switch-on", "/public/Submenu/sounds/stop-13692.wav"),
    ImageAsset("Good_Run", 480, 360, "/public/Grid/costumes/Good_Run.png"),
    ImageAsset("End_Break_Line", 480, 360, "/public/Grid/costumes/End_Break_Line.png"),
]);

export {
    IMAGES,
    AUDIO
};