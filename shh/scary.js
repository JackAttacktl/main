var audio = new Audio('ErrorScreen.ogg');
audio.loop = true;
audio.addEventListener("canplaythrough", () => {
    audio.play().catch(e => {
       window.addEventListener('click', () => {
            audio.play()
       }, { once: true })
    })
 });