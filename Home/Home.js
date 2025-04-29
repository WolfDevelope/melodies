// Thêm CSS custom cho Splide Billboard slider vào head
(function addSplideBillboardCSS() {
  const style = document.createElement('style');
  style.innerHTML = `
    #billboardSplide .splide__arrow {
      background: #23172b;
      color: #ff69b4;
      width: 3rem;
      height: 3rem;
      border-radius: 9999px;
      box-shadow: 0 2px 8px #0003;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      transition: background 0.2s, color 0.2s;
    }
    #billboardSplide .splide__arrow--prev {
      left: -3.5rem;
    }
    #billboardSplide .splide__arrow--next {
      right: -3.5rem;
    }
    #billboardSplide .splide__arrow:hover {
      background: #ff69b4;
      color: #fff;
    }
    #billboardSplide .splide__slide {
      width: 100% !important;
      margin: 0 !important;
    }
    #billboardSplide .splide__track {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  `;
  document.head.appendChild(style);
})();

// Khởi tạo Splide slider cho Billboard
window.addEventListener('DOMContentLoaded', function () {
  if (window.Splide) {
    var splide = new Splide('#billboardSplide', {
      type   : 'loop',
      padding: 0,
    });
    splide.mount();
  }
});

// Hiển thị tên user ở phần chào mừng trang HomeUser
window.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  var userNameEl = document.getElementById('userName');
  if(userNameEl) {
    userNameEl.textContent = user.name || 'User';
  }
});

// Chức năng tìm kiếm: Ẩn các phần không khớp trên index.html
window.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const keyword = this.value.trim().toLowerCase();
    const items = document.querySelectorAll('.search-item');
    items.forEach(item => {
      // Ghép toàn bộ text của item (bao gồm cả con)
      const text = item.textContent.toLowerCase();
      if (!keyword || text.includes(keyword)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ====== MUSIC PLAYER & SHARE FUNCTIONALITY ======
window.addEventListener('DOMContentLoaded', function () {
  // Kiểm tra đăng nhập
  function isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  // MUSIC PLAYER
  const musicPlayerModal = document.getElementById('musicPlayerModal');
  const audioPlayer = document.getElementById('audioPlayer');
  const playerTitle = document.getElementById('playerTitle');
  const playerArtist = document.getElementById('playerArtist');
  const playerCover = document.getElementById('playerCover');
  const closePlayerBtn = document.getElementById('closePlayerBtn');
  document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (!isLoggedIn()) {
        alert('Bạn cần đăng nhập để nghe nhạc trực tuyến!');
        return;
      }
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title') || btn.closest('.search-item')?.querySelector('span, .song-title')?.textContent || 'Bài hát';
      const artist = btn.getAttribute('data-artist') 
        || btn.closest('.search-item')?.querySelector('.song-artist')?.textContent 
        || btn.parentElement?.parentElement?.querySelector('span.text-xs.text-gray-400')?.textContent 
        || 'Nghệ sĩ';
      let cover = btn.getAttribute('data-cover');
      if (!cover) {
        // Tìm thẻ img trong cùng card (tìm cha có class chứa 'bg-[#2d2240]')
        let card = btn.closest('[class*="bg-[#2d2240]"]');
        cover = card ? card.querySelector('img')?.src : undefined;
      }
      cover = cover || './weeklytopsongimage/Rectangle 17.png';
      if (!audioPlayer || !musicPlayerModal || !playerTitle || !playerArtist || !playerCover) {
        console.error('Player element missing');
        return;
      }
      if (!src) {
        alert('Không tìm thấy file nhạc cho bài hát này.');
        return;
      }
      audioPlayer.src = src;
      audioPlayer.load();
      playerTitle.textContent = title;
      playerArtist.textContent = artist;
      playerCover.src = cover;
      musicPlayerModal.classList.remove('hidden');
      audioPlayer.play();
    });
  });
  if(closePlayerBtn) closePlayerBtn.onclick = () => {
    if (musicPlayerModal && audioPlayer) {
      musicPlayerModal.classList.add('hidden');
      audioPlayer.pause();
    }
  };
});

// ====== SPOTIFY-LIKE PLAYER CONTROLS ======
window.addEventListener('DOMContentLoaded', function () {
  const audio = document.getElementById('audioPlayer');
  const playBtn = document.getElementById('btn-playpause');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const shuffleBtn = document.getElementById('btn-shuffle');
  const repeatBtn = document.getElementById('btn-repeat');
  const progressBar = document.getElementById('progressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const volumeBar = document.getElementById('volumeBar');

  // Play/Pause toggle
  if(playBtn) playBtn.onclick = function() {
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
  if(audio) {
    audio.addEventListener('play', () => {
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
    });
    audio.addEventListener('pause', () => {
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
    });
    // Progress bar update
    audio.addEventListener('timeupdate', () => {
      if(audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
      }
    });
    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audio.duration);
    });
    // Seek
    progressBar.oninput = function() {
      if(audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
      }
    };
    // Volume
    volumeBar.oninput = function() {
      audio.volume = volumeBar.value;
    };
    // Init
    volumeBar.value = audio.volume;
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
  }
  // Dummy next/prev/shuffle/repeat
  if(prevBtn) prevBtn.onclick = function() { audio.currentTime = 0; };
  if(nextBtn) nextBtn.onclick = function() { audio.currentTime = audio.duration || 0; };
  if(shuffleBtn) shuffleBtn.onclick = function() { shuffleBtn.classList.toggle('active'); };
  if(repeatBtn) repeatBtn.onclick = function() { repeatBtn.classList.toggle('active'); };

  function formatTime(sec) {
    sec = Math.floor(sec);
    const min = Math.floor(sec/60);
    const s = sec%60;
    return `${min}:${s<10?'0':''}${s}`;
  }
});

// ====== BILLBOARD SLIDER LOGIC (SAFE CHECK) ======
const billboardSlider = document.getElementById('billboardSlider');
const dots = document.querySelectorAll('#billboardDots span');
if (billboardSlider && dots.length) {
  const slides = billboardSlider.querySelectorAll('section');
  let currentSlide = 0;

  function updateBillboardSlider() {
    billboardSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.remove('bg-pink-400', 'bg-gray-400');
      dot.classList.add(idx === currentSlide ? 'bg-pink-400' : 'bg-gray-400');
    });
  }

  document.getElementById('billboardPrev').onclick = function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateBillboardSlider();
  };
  document.getElementById('billboardNext').onclick = function() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateBillboardSlider();
  };

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentSlide = idx;
      updateBillboardSlider();
    });
  });

  // Optional: swipe support for mobile
  let startX = 0;
  billboardSlider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  billboardSlider.addEventListener('touchend', e => {
    let dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) document.getElementById('billboardPrev').click();
    if (dx < -50) document.getElementById('billboardNext').click();
  });

  // Khởi tạo đúng màu dot khi load trang
  updateBillboardSlider();
}