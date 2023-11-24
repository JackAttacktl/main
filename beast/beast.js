const beasts = [
    "beast1.png",
    "beast2.png",
    "beast3.png",
    "beast4.png",
    "beast5.png",
    "beast6.png"
];
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