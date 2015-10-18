function vidplay(video) {
   if (video.paused) {
      video.play();
   } else {
      video.pause();
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
    var videos = document.getElementsByClassName("video");
    for(var i = 0; i < retartBtns.length; i++){
        retartBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            restart(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0]);
        });
        rewBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            skip(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0], -10);
        });
        playBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            vidplay(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0]);
        });
        fastFwdBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            skip(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0], 10);
        });
        videos[i].addEventListener("pause", function(e){
            var button = e.currentTarget.parentElement.getElementsByClassName("playBtn")[0];
            button.setAttribute("title", "Play");
            button.children[0].setAttribute("src", "img/play.jpg");
        });
        videos[i].addEventListener("play", function(e){
            var button = e.currentTarget.parentElement.getElementsByClassName("playBtn")[0];
            button.setAttribute("title", "Pause");
            button.children[0].setAttribute("src", "img/pause.jpg");
        });
    }
};