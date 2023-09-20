

//buttons

let open = document.querySelector("#open");
let video = document.querySelector("#video");
let logo = document.querySelector("#logo");
let start = document.querySelector("#start");
let stop = document.querySelector("#stop");
let save = document.querySelector("#save");

//instructions

let one = document.querySelector("#one");
let two = document.querySelector("#two");


let camera = null;
let media_recorder = null;
let blobs_recorded = [];


//test data


//initiate face detector

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)


//camera functions

function startVideo() {
  open.addEventListener('click', async function () {
    camera = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    video.srcObject = camera;
    video.style.display = 'block';
    logo.style.display = 'none';
    open.style.display = 'none';

    start.style.display = 'block';
    err => console.error(err)
  });

}
start.addEventListener('click', function () {
  media_recorder = new MediaRecorder(camera, { mimeType: 'video/webm' });
  media_recorder.addEventListener('dataavailable', function (e) {
    blobs_recorded.push(e.data);
  }
  );
  one.style.display = "flex";

  setTimeout(function () {
    one.style.display = "none";
    two.style.display = "flex";
  }, 5000);



  media_recorder.addEventListener('stop', function () {
    let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
    save.href = video_local;

  });

  media_recorder.start(1000);
  start.style.display = 'none';
  stop.style.display = 'block';
});

stop.addEventListener('click', function () {
  media_recorder.stop();
  start.style.display = 'block';
  save.style.display = 'block';
  start.innerHTML = 'Record Again';

  stop.style.display = 'none';


  one.style.display = "none";
  two.style.display = "none";

});

// Configure the PostgreSQL client




//face detection algorithm

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

