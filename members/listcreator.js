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
    }
};

function load_members() {
    for (const [username, data] of Object.entries(members)) {
        const a = document.createElement("a");
        a.className = "member";
        a.href = data.link;
        a.style = "outline-color: " + data.color + ";"
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
        document.body.appendChild(a);
    }
}