async function requestCamAndStreamInVideo(video) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })

    if (video && video instanceof HTMLVideoElement) {
        video.srcObject = mediaStream
    }
}

async function captureScreenshotFromMediaStream(mediaStream) {
    if (!mediaStream || !(mediaStream instanceof MediaStream)) return

    const imageCapture = new ImageCapture(mediaStream.getVideoTracks()[0])
    const blob = await imageCapture.takePhoto()

    return blob
}
/*
Hacky code.

Khi ấn chụp ảnh thì:
- Vẽ từ MediaStream ra canvas
- Dùng hàm toDataURL để convert ra base64
Khi ấn upload ảnh thì:
- Gọi click() của đối tượng input image tạm.
- Select xong thì load vào thẻ img tạm.
- Thẻ img load xong thì vẽ ra canvas.
- Rồi dùng hàm toDataURL.

Kết quả của 2 hành động là quăng đống base64 vào một input hidden.
*/
const cameraFeed = document.getElementById("camera-feed");
const cameraShootBtn = document.getElementById("take-image");
const uploadImageBtn = document.querySelector('#upload-image');
const cameraResult = document.getElementById('photo-taken');
const inputAnh = document.querySelector('#anh');
const tempCanvas = document.createElement('canvas');
const tempImageInput = document.createElement('input');
tempImageInput.type = 'file';
tempImageInput.accept = 'image/*'

cameraShootBtn.addEventListener('click', function() {
    requestCamAndStreamInVideo(cameraFeed);
    if (cameraFeed.classList.contains('hidden')) {
        cameraResult.classList.add('hidden');
        cameraFeed.classList.remove('hidden');
        return;
    }
    var mediaTrack = cameraFeed.srcObject.getVideoTracks()[0].getSettings();
    tempCanvas.width = mediaTrack.width;
    tempCanvas.height = mediaTrack.height;
    tempCanvas.getContext('2d').drawImage(cameraFeed, 0, 0);
    cameraFeed.classList.add('hidden');
    cameraResult.classList.remove('hidden');
    var dataURL = tempCanvas.toDataURL('image/webp');
    inputAnh.value = dataURL;
    cameraResult.src = dataURL;
});


tempImageInput.onchange = (e) => {
    var reader = new FileReader();
    reader.onload = (e) => {
        inputAnh.value = e.target.result;
        cameraResult.src = e.target.result;
        if (cameraResult.classList.contains('hidden')) {
            cameraFeed.classList.add('hidden');
            cameraResult.classList.remove('hidden');
        }
    }
    reader.readAsDataURL(e.target.files[0]);
}

uploadImageBtn.addEventListener('click', function() {
    tempImageInput.click();
})