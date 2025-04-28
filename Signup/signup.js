document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const phone = document.getElementById('signupPhone').value.trim();

  // Kiểm tra dữ liệu đầu vào
  if (!name || !email || !password || !phone) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }
  // Kiểm tra email đã tồn tại chưa
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    alert('Email này đã được đăng ký!');
    return;
  }
  // Lưu thông tin tài khoản mới
  users.push({ name, email, password, phone });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
  window.location.href = '../Login/Login.html';
});
