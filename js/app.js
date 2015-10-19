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

function timeLine_webm() {
    curTime = document.getElementById("video_webm").currentTime;
    durTime = document.getElementById("video_webm").duration;
    barWidth = curTime / durTime * 562;
    document.getElementById("bar_1").style.width = barWidth + "px";
    curTime = curTime.toFixed(0);
    seconds = curTime % 60;
    minutes = (curTime - seconds)/60;
    if (seconds < 10) seconds = "0" + seconds;
    curTime = minutes + ":" + seconds;
    document.getElementById("time_1").innerHTML = curTime;
}
function timeLine_ogg() {
    curTime = document.getElementById("video_ogg").currentTime;
    durTime = document.getElementById("video_ogg").duration;
    barWidth = curTime / durTime * 562;
    document.getElementById("bar_2").style.width = barWidth + "px";
    curTime = curTime.toFixed(0);
    seconds = curTime % 60;
    minutes = (curTime - seconds)/60;
    if (seconds < 10) seconds = "0" + seconds;
    curTime = minutes + ":" + seconds;
    document.getElementById("time_2").innerHTML = curTime;
}
function timeLine_mp4() {
    curTime = document.getElementById("video_mp4").currentTime;
    durTime = document.getElementById("video_mp4").duration;
    barWidth = curTime / durTime * 562;
    document.getElementById("bar_3").style.width = barWidth + "px";
    curTime = curTime.toFixed(0);
    seconds = curTime % 60;
    minutes = (curTime - seconds)/60;
    if (seconds < 10) seconds = "0" + seconds;
    curTime = minutes + ":" + seconds;
    document.getElementById("time_3").innerHTML = curTime;
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
    }
};