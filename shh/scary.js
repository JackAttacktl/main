var audio = new Audio('ErrorScreen.ogg');
audio.loop = true;
audio.addEventListener("canplaythrough", () => {
    audio.play().catch(e => {
       window.addEventListener('click', () => {
            audio.play()
       }, { once: true })
    })
 });

 var clickCount = 0;
 document.body.onclick = function()
 {
   clickCount++;
   if (clickCount >= 10)
   {
      document.location = '/main/beast';
   }
 }