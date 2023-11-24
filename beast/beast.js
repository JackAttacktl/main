var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

const beasts = [
    "beast1.png",
    "beast2.png",
    "beast3.png",
    "beast4.png",
    "beast5.png",
    "beast6.png"
];

beasts.forEach(img => function()
{
    preload(img)
});

const beastimg = document.getElementById('beastimg');

setInterval(function()
{
    beastimg.src = beasts[Math.floor(Math.random() * 6)]
},10)

var audio = new Audio('mus_mrbeastovania.wav');
audio.loop = true;
audio.addEventListener("canplaythrough", () => {
    audio.play().catch(e => {
       window.addEventListener('click', () => {
            audio.play()
       }, { once: true })
    })
 });