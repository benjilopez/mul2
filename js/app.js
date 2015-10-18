function vidplay(button) {
   var video = button.parentElement.previousElementSibling;
   if (video.paused) {
      video.play();
      button.setAttribute("title", "Pause");
      button.children[0].setAttribute("src", "img/pause.jpg");
   } else {
      video.pause();
      button.setAttribute("title", "Play");
      button.children[0].setAttribute("src", "img/play.jpg");
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
            e.preventDefault();
            restart(e.currentTarget.parentElement.previousElementSibling);
        });
        rewBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            skip(e.currentTarget.parentElement.previousElementSibling, -10);
        });
        playBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            vidplay(e.currentTarget);
        });
        fastFwdBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            skip(e.currentTarget.parentElement.previousElementSibling, 10);
        });
    }
}