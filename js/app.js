function vidplay(button) {
   var video = button.parentElement.previousElementSibling;
   if (video.paused) {
      video.play();
      button.textContent = "||";
   } else {
      video.pause();
      button.textContent = ">";
   }
}

function restart(video) {
    video.currentTime = 0;
}

function skip(video, value) {
    video.currentTime += value;
}

window.onload=function(){
    var retartBtns = document.getElementsByClassName("restartBtn");
    var rewBtns = document.getElementsByClassName("rewBtn");
    var playBtns = document.getElementsByClassName("playBtn");
    var fastFwdBtns = document.getElementsByClassName("fastFwdBtn");
    for(var i = 0; i < retartBtns.length; i++){
        retartBtns[i].addEventListener("click", function(e){
            restart(e.currentTarget.parentElement.previousElementSibling);
        });
        rewBtns[i].addEventListener("click", function(e){
            skip(e.currentTarget.parentElement.previousElementSibling, -10);
        });
        playBtns[i].addEventListener("click", function(e){
            vidplay(e.currentTarget);
        });
        fastFwdBtns[i].addEventListener("click", function(e){
            skip(e.currentTarget.parentElement.previousElementSibling, 10);
        });
    }
}