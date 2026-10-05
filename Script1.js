let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


function playVideo(element) {
    // 1. Find the video and poster relative to what was clicked
    const card = element.closest('.movie-card');
    const video = card.querySelector('.video-player');
    const poster = card.querySelector('.poster-container');

    if (video) {
        // 2. Load the video source explicitly
        video.load(); 

        // 3. Hide poster and show video
        poster.style.display = 'none';
        video.style.display = 'block';

        // 4. Play with a "Muted" fallback 
        // Browsers often block video.play() if sound is on
        video.muted = true; 
        
        let playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Playback failed. Showing controls for manual start.");
                video.controls = true;
            });
        }
    }
}