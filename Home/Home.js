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