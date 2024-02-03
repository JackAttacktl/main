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

const memberobjects = {};
const music = new Audio("remix.ogg");
music.loop = true;
music.volume = 0.5;
let paused = true;

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
        memberobjects.newelm = 0;
        newelm.addEventListener("mouseenter", function() {
            newelm.style.zIndex = memberobjects.newelm + 1
            memberobjects.newelm++;
            if (navigator.userActivation.hasBeenActive) {
                const clickSound = new Audio("click.mp3");
                clickSound.volume = 0.5;
                clickSound.play();
                clickSound.addEventListener("ended", function() {
                    delete clickSound;
                });
            }
        });
    }
    document.getElementById("musicbutton").addEventListener("click", function() {
        if (paused) {
            music.play();
            paused = false;
            document.getElementById("musicbutton").innerText = "⏸️";
        }
        else {
            music.pause();
            paused = true;
            document.getElementById("musicbutton").innerText = "▶️";
        }
    });
}

const intID = setInterval(function() {
    if (navigator.userActivation.hasBeenActive) {
        clearInterval(intID);
        music.play();
        paused = false;
        document.getElementById("musicbutton").style.visibility = "visible";
    }
},0);