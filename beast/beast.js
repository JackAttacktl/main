var audio = new Audio('mus_mrbeastovania.wav');
audio.loop = true;
audio.addEventListener("canplaythrough", () => {
    audio.play().catch(e => {
       window.addEventListener('click', () => {
            audio.play()
       }, { once: true })
    })
 });