var rightWristX=0
var leftWristX=0
var rightWristY=0
var leftWristY=0
var score_leftWrist=0
var score_rightWrist=0

song="";

function preload(){
song=loadSound("music.mp3")
}

function setup(){
canvas=createCanvas(600, 600);
canvas.center();
video=createCapture(VIDEO);
video.hide()
poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotPoses)
}

function modelLoaded(){
console.log('poseNet is initialized')
}

function gotPoses(results){
console.log(results[0])
if (results.length>0) {
rightWristX=results[0].pose.rightWrist.x;
leftWristX=results[0].pose.leftWrist.x;
rightWristY=results[0].pose.rightWrist.y;
leftWristY=results[0].pose.leftWrist.y;
score_rightWrist=results[0].pose.keypoints[9].score
score_leftWrist=results[0].pose.keypoints[10].score
console.log("score" + score_rightWrist, score_leftWrist)
console.log("right:", +rightWristX, rightWristY)
console.log("left:", +leftWristX, leftWristY)
}
}

function draw(){
image(video, 0, 0, 550, 550)
fill("red")
stroke("red")
if (score_rightWrist>0.2) {
circle(rightWristX, rightWristY, 30)
if (rightWristY>0 && rightWristY<100) {
document.getElementById("speed").innerHTML="speed= 0.5X"
song.rate(0.5)    
}
else if (rightWristY>100 && rightWristY<200) {
document.getElementById("speed").innerHTML="speed= 1X"
song.rate(1)
}
else if (rightWristY>200 && rightWristY<300) {
    document.getElementById("speed").innerHTML="speed= 1.5X"
    song.rate(1.5)
}    
else if (rightWristY>300 && rightWristY<400) {
    document.getElementById("speed").innerHTML="speed= 2X"
    song.rate(2)
}    
}

if (score_leftWrist>0.2) {
circle(leftWristX, leftWristY, 20)
InNumberleftWristY=Number(leftWristY);
newleftWristY=floor(InNumberleftWristY*2);
leftWristY_divide=newleftWristY/1000;
document.getElementById("volume").innerHTML="volume="+leftWristY_divide;
song.setVolume(leftWristY_divide)
}

}

function play(){
song.play()
song.rate(1)
song.setVolume(1)
}