// Custom Audio Player JavaScript
// This script provides full control over HTML5 audio playback

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to all player elements
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const seekBar = document.getElementById('seekBar');
    const volumeBar = document.getElementById('volumeBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const volumeValue = document.getElementById('volumeValue');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    // Format time from seconds to MM:SS format
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            playPauseBtn.setAttribute('aria-label', 'Pause');
        } else {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            playPauseBtn.setAttribute('aria-label', 'Play');
        }
    });

    // Stop button functionality
    stopBtn.addEventListener('click', function() {
        audio.pause();
        audio.currentTime = 0;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Play');
    });

    // Update time display and seek bar as audio plays
    audio.addEventListener('timeupdate', function() {
        // Update current time display
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        
        // Update seek bar position (without triggering change event)
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            seekBar.value = progress;
            // Update CSS variable for progress bar styling
            seekBar.style.setProperty('--progress', progress + '%');
        }
    });

    // Set duration display when metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audio.duration);
        seekBar.max = 100;
    });

    // Seek bar functionality - jump to different position
    seekBar.addEventListener('input', function() {
        if (audio.duration) {
            const seekTo = (seekBar.value / 100) * audio.duration;
            audio.currentTime = seekTo;
        }
    });

    // Volume control functionality
    volumeBar.addEventListener('input', function() {
        // Convert 0-100 range to 0-1 range for audio.volume
        const volumeLevel = volumeBar.value / 100;
        audio.volume = volumeLevel;
        volumeValue.textContent = Math.round(volumeBar.value) + '%';
    });

    // Handle audio ending
    audio.addEventListener('ended', function() {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Play');
        seekBar.value = 0;
        seekBar.style.setProperty('--progress', '0%');
    });

    // Handle errors
    audio.addEventListener('error', function() {
        console.error('Error loading audio file');
        alert('Error loading audio file. Please check the file path and format.');
    });

    // Initialize volume display
    volumeValue.textContent = volumeBar.value + '%';
    
    // Set initial audio volume
    audio.volume = volumeBar.value / 100;
});
