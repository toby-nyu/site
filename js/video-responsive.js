// Function to set video source based on screen width
function setVideoSource() {
    const video = document.getElementById('responsive-video');
    const source = document.getElementById('video-source');
    const width = window.innerWidth;
    
    let videoSrc;
    if (width >= 1920) {
        videoSrc = '../media/sample-video-1080.mp4';
    } else if (width >= 1280) {
        videoSrc = '../media/sample-video-720.mp4';
    } else {
        videoSrc = '../media/sample-video-480.mp4';
    }
    
    // Only update if the source has changed
    if (!source.src.endsWith(videoSrc)) {
        source.src = videoSrc;
        video.load(); // Reload the video with the new source
    }
}

// Set initial source
setVideoSource();

// Update source on window resize (with debounce to avoid excessive calls)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setVideoSource, 250);
});
