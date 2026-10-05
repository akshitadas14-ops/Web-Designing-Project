// ── Hero slideshow (box2) ──────────────────────────────
const heroData = [
  {
    title: "S Q U I D &nbsp; G A M E",
    desc: "Squid Game is a South Korean survival drama. 456 contestants play children's games for a massive cash prize.",
    info: "Action | Sci-Fi | Suspense | ⭐ 8.9",
    videoId: "video1",
    plainTitle: "Squid Game",
    image: "MEDIA/squid game.MP4",
    rating: "8.9",
    thumb: "MEDIA/series1.JPG"
  },
  {
    title: "KUNG-FU P A N D A 4",
    desc: "The Dragon Warrior, Po, faces a new challenge as he transitions from kung fu combat to spiritual leadership. When ancient prophecies and the Furious Five converge, Po must find a new sense of purpose in the Valley of Peace, testing his trademark humor and heart along the way.",
    info: "Family | Animation | Adventure | Fantasy | ⭐ 8.5",
    videoId: "video2",
    plainTitle: "Kung-Fu Panda-4",
    image: "MEDIA/kungfu4.MP4",
    rating: "8.5",
    thumb: "MEDIA/kungfu.JPG"
  },
  {
    title: "W E D N E S D A Y",
    desc: "A supernatural mystery following Wednesday Addams at Nevermore Academy — psychic visions, murders, and a 400-year-old family secret.",
    info: "Supernatural | Horror | Mystery | Thriller | ⭐ 9.2",
    videoId: "video3",
    plainTitle: "Wednesday",
    image: "MEDIA/wednesday.MOV",
    rating: "9.2",
    thumb: "MEDIA/webseries2.JPG"
  }
];

let heroIndex = 0;

let heroAudioMuted = true;

function toggleSlideAudio() {
  heroAudioMuted = !heroAudioMuted;
  document.querySelectorAll('.box2 video').forEach(v => v.muted = heroAudioMuted);
  const icon = document.getElementById('audioIcon');
  icon.className = heroAudioMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
}

function showHeroSlide(n) {
  const slides = document.querySelectorAll('.box2 .mySlides');
  const dots = document.querySelectorAll('.hero-dot');
  heroIndex = (n + slides.length) % slides.length;

  slides.forEach(s => s.style.display = 'none');
  dots.forEach(d => d.classList.remove('active'));

  slides[heroIndex].style.display = 'block';
  dots[heroIndex].classList.add('active');

  // Pause all videos, play current
  document.querySelectorAll('.box2 video').forEach(v => { v.pause(); v.muted = heroAudioMuted; });
  const vid = document.getElementById(heroData[heroIndex].videoId);
  if (vid) { vid.currentTime = 0; vid.muted = heroAudioMuted; vid.play(); }

  // Update text
  document.getElementById('slide-title').innerHTML = heroData[heroIndex].title;
  document.getElementById('slide-desc').innerText = heroData[heroIndex].desc;
  document.getElementById('slide-info').innerText = heroData[heroIndex].info;
}

function changeHeroSlide(dir) { showHeroSlide(heroIndex + dir); }
function goHeroSlide(n) { showHeroSlide(n - 1); }

// Init hero
showHeroSlide(0);
setInterval(() => changeHeroSlide(1), 6000);

// ── Container slideshow (web series section) ──────────────
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {
  const slides = document.querySelectorAll('.container .mySlides');
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(s => s.style.display = 'none');
  for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

// ── Romance Row scroll ──────────────────────────────────
function scrollRomanceRow(dir) {
    const track = document.getElementById('romanceRowTrack');
    track.scrollLeft += dir * 460;
}

// ── Section row scroll (Top Rated + Kids) ──────────────
function scrollSection(id, dir) {
    const el = document.getElementById(id);
    el.scrollLeft += dir * 460;
}

// Search toggle
function toggleSearch() {
    const input = document.getElementById('searchInput');
    input.classList.toggle('open');
    if (input.classList.contains('open')) input.focus();
}

// Hamburger menu toggle
function toggleMenu() {
    const dropdown = document.getElementById('menuDropdown');
    dropdown.classList.toggle('open');
}
// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const menu = document.getElementById('menuIcon');
    if (menu && !menu.contains(e.target)) {
        document.getElementById('menuDropdown').classList.remove('open');
    }
});

// Scroll to horror section
function scrollToHorror() {
    document.getElementById('horror-section').scrollIntoView({ behavior: 'smooth' });
}

// Scroll to reviews section
function scrollToReviews() {
    document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' });
}

// ── Wishlist (localStorage) ──────────────────────────────
function getWishlist() {
    return JSON.parse(localStorage.getItem('flixverse_wishlist') || '[]');
}

function addToWishlist() {
    const item = heroData[heroIndex];
    const list = getWishlist();
    const exists = list.find(i => i.plainTitle === item.plainTitle);
    if (exists) {
        showToast(`"${item.plainTitle}" is already in your list!`);
        return;
    }
    list.push({ plainTitle: item.plainTitle, thumb: item.thumb, rating: item.rating });
    localStorage.setItem('flixverse_wishlist', JSON.stringify(list));
    showToast(`"${item.plainTitle}" added to My List!`);
}

function addItemToWishlist(title, thumb, rating) {
    const list = getWishlist();
    const exists = list.find(i => i.plainTitle === title);
    if (exists) {
        showToast(`"${title}" is already in your list!`);
        return;
    }
    list.push({ plainTitle: title, thumb: thumb, rating: rating });
    localStorage.setItem('flixverse_wishlist', JSON.stringify(list));
    showToast(`"${title}" added to My List!`);
}

function showToast(msg) {
    let toast = document.getElementById('wl-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'wl-toast';
        toast.style.cssText = `position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
            background:rgba(255,35,145,0.92);color:white;padding:12px 28px;border-radius:30px;
            font-size:13px;font-weight:700;z-index:9999;letter-spacing:0.5px;
            box-shadow:0 0 20px rgba(255,35,145,0.5);transition:opacity 0.4s;`;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.style.opacity = '0', 2500);
}

// Trailer modal
function openTrailerModal() {
    const modal = document.getElementById('trailerModal');
    const player = document.getElementById('trailerPlayer');
    player.src = heroData[heroIndex].image;
    modal.style.display = 'flex';
    player.play();
}
function closeTrailer() {
    const modal = document.getElementById('trailerModal');
    const player = document.getElementById('trailerPlayer');
    player.pause();
    player.src = '';
    modal.style.display = 'none';
}

// Romance video modal
function playRomVideo(src, thumb) {
    const modal = document.getElementById('romModal');
    const player = document.getElementById('romVideoPlayer');
    const header = document.getElementById('romModalHeader');
    player.src = src;
    header.style.backgroundImage = `url('${thumb}')`;
    modal.style.display = 'flex';
    player.play();
}
function closeRomVideo() {
    const modal = document.getElementById('romModal');
    const player = document.getElementById('romVideoPlayer');
    player.pause();
    player.src = '';
    modal.style.display = 'none';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeRomVideo(); closeTrailer(); } });

// Horror section scroll
function scrollHorror(dir) {
    const row = document.getElementById('horrorRow');
    row.scrollLeft += dir * 460;
}

// Horror effect on poster click
function triggerHorror(el) {
    el.classList.remove('horror-active');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('horror-active');
    setTimeout(() => el.classList.remove('horror-active'), 700);
}



function updateBanner(title, desc, bgImage) {
  document.getElementById('banner-title').innerText = title;
  document.getElementById('banner-desc').innerText = desc;
  document.getElementById('hero-banner').style.backgroundImage =
    `linear-gradient(to right, rgba(0,0,0,0.8), transparent), url('${bgImage}')`;
}

