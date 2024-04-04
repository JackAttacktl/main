const memberobjects = [];
const zindexes = [];

function load_members() {
    console.log("Start fetching..");
    fetch("assets/membersList.json").then(function(res) {
        if (!res.ok) {
            throw new Error ('HTTP Error')
        }
        const members = res.json();
        console.log(members);
        const membercontainer = document.getElementById("membercontainer");
        for (const [username, data] of Object.entries(members)) {
            const a = document.createElement("a");
            a.className = "member";
            a.href = username;
            a.style = "border-color: " + data.color + "; box-shadow: 0px 0px 20px 1px " + data.color + "; z-index: 0"
            const img = document.createElement("img");
            img.src = "assets/" + data.avatar_file_name;
            const div = document.createElement("div");
            const h1 = document.createElement("h1");
            h1.innerText = data.display_name + " (" + data.username + ")";
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
    });
}