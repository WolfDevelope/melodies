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

// Billboard slider logic with dot indicator update
const billboardSlider = document.getElementById('billboardSlider');
const slides = billboardSlider.querySelectorAll('section');
const dots = document.querySelectorAll('#billboardDots span');
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