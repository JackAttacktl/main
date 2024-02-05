const members = {
    "Jaxon": {
        "avatar": "https://cdn.discordapp.com/avatars/859248471839473684/a3b992084a681eb059af82bc715366db.png",
        "description": "Don't tell rockstar I stole their beta release",
        "color": "blue",
        "link": "jaxon/"
    },
    "Wizard": {
        "avatar": "https://cdn.discordapp.com/avatars/803471962084212777/29fbf32c756dd0021a2de5c3c79c9a33.png",
        "description": "★ :EspressoHappy: Hai I'm DeceasedWizard (Wiz)!",
        "color": "red",
        "link": "wizard/"
    },
    "Mercedeez": {
        "avatar": "https://cdn.discordapp.com/avatars/834139398592659466/422c362147040325ebe28ecbb59be1a3.png",
        "description": "I'M THE TWINKLE",
        "color": "pink",
        "link": "mercedeez/"
    }
};

const memberobjects = [];
const zindexes = [];
const music = new Audio("remix.ogg");
let couldplay = false;
let canplay = false;
music.currentTime = (sessionStorage.getItem("music_playback") || 0);
music.loop = true;
music.volume = 0.1;
let paused = true;
let ragdollplaying = false;

function load_members() {
    const membercontainer = document.getElementById("membercontainer");
    for (const [username, data] of Object.entries(members)) {
        const a = document.createElement("a");
        a.className = "member";
        a.href = data.link;
        a.style = "border-color: " + data.color + "; box-shadow: 0px 0px 20px 1px " + data.color + "; z-index: 0"
        const img = document.createElement("img");
        img.src = data.avatar;
        const div = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.innerText = username;
        const h2 = document.createElement("h2");
        h2.innerText = data.description;
        a.appendChild(img);
        div.appendChild(h1);
        div.appendChild(h2);
        a.appendChild(div);
        const newelm = membercontainer.appendChild(a);
        memberobjects.push(newelm);
        zindexes.push(newelm);
        newelm.addEventListener("mouseenter", function() {
            for (var i = 0; i < zindexes.length; i++) {
                if (zindexes[i] == newelm) {
                    zindexes.splice(i,1);
                    zindexes.push(newelm);
                    break;
                }
            }
            for (var i = 0; i < zindexes.length; i++) {
                zindexes[i].style.zIndex = i
            }
            if (navigator.userActivation.hasBeenActive) {
                const clickSound = new Audio("click.mp3");
                clickSound.volume = 0.1;
                clickSound.play();
                clickSound.addEventListener("ended", function() {
                    delete clickSound;
                });
            }
        });
    }
    document.getElementById("musicbutton").addEventListener("click", function() {
        if (canplay) {
            if (paused) {
                music.play();
                paused = false;
                document.getElementById("musicbutton").src = "pause.png";
            }
            else {
                music.pause();
                paused = true;
                document.getElementById("musicbutton").src = "play.png";
            }
        }
    });
}

const intID = setInterval(function() {
    if (navigator.userActivation.hasBeenActive && couldplay) {
        clearInterval(intID);
        music.play();
        canplay = true;
        document.getElementById("musicbutton").src = "pause.png";
        document.getElementById("musicbutton").style = "background-color: white;"
        paused = false;
    }
},0);

music.addEventListener("canplaythrough",function() {
    couldplay = true;
});

window.addEventListener("beforeunload",function() {
    this.sessionStorage.setItem("music_playback",music.currentTime);
});

function ragdollspam() {
    const elm1 = memberobjects[0];
    const elm2 = memberobjects[1];
    if (memberobjects.length > 2) {
        memberobjects[2].style.zIndex = (memberobjects[2].style.zIndex > 1 ? memberobjects[2].style.zIndex : 2)
    }
    const spamsound = new Audio("ragdoll spam.mp3");
    spamsound.volume = 0.2
    spamsound.oncanplaythrough = function() {
        spamsound.play();
        spaminter = setInterval(function() {
            if (spamsound.ended) {
                clearInterval(spaminter);
                ragdollplaying = false;
            }
            if (Math.random() <= 0.5) {
                elm1.style.zIndex = 0
                elm2.style.zIndex = 1
            } else {
                elm1.style.zIndex = 1
                elm2.style.zIndex = 0
            }
        },0);
    }
}

setInterval(function() {
    if (Math.random() <= 0.01) {
        if (!ragdollplaying && navigator.userActivation.hasBeenActive && memberobjects.length > 1) {
            ragdollplaying = true;
            ragdollspam();
        }
    }
},1000);