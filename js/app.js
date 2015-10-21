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

function updateTimeLine(video){
    //alert("width: " + document.getElementsByClassName("video")[0].clientWidth);
    var curTime = video.currentTime;
    var durTime = video.duration;
    //var x = document.getElementsByTagName("H1")[0].getAttribute("class");
    var barWidth = curTime / durTime * document.getElementsByClassName("vidSection")[0].clientWidth;
    var timebar = video.parentElement.getElementsByClassName("timebar")[0];
    var counter = video.parentElement.getElementsByClassName("timeCounter")[0];
    timebar.style.width = barWidth + "px";
    curTime = curTime.toFixed(0);
    var seconds = curTime % 60;
    var minutes = (curTime - seconds)/60;
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;
    curTime = minutes + ":" + seconds;
    counter.innerHTML = curTime;
}

window.onload=function(){
    var restartBtns = document.getElementsByClassName("restartBtn");
    var rewBtns = document.getElementsByClassName("rewBtn");
    var playBtns = document.getElementsByClassName("playBtn");
    var fastFwdBtns = document.getElementsByClassName("fastFwdBtn");
    var videos = document.getElementsByClassName("video");
    for(var i = 0; i < restartBtns.length; i++){
        restartBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            restart(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0]);
        });
        rewBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            skip(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0], -2);
        });
        playBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            vidplay(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0]);
        });
        fastFwdBtns[i].addEventListener("click", function(e){
            e.preventDefault();
            skip(e.currentTarget.parentElement.parentElement.getElementsByClassName("video")[0], 2);
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
        videos[i].addEventListener("timeupdate", function(e){
            updateTimeLine(e.currentTarget);
        });
    }
};