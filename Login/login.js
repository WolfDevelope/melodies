document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      alert('Vui lòng nhập email và mật khẩu!');
      return;
    }
    // Lấy danh sách tài khoản
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Email hoặc mật khẩu không đúng!');
      return;
    }
    // Đăng nhập thành công
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Đăng nhập thành công!');
    window.location.href = '../Home/HomeUser.html';
  });
});
