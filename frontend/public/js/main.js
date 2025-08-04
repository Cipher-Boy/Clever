import { auth } from './auth.js';

// Initialize page
function init() {
  updateAuthUI();
  setupEventListeners();
}

// Update UI based on authentication state
function updateAuthUI() {
  const isLoggedIn = auth.isAuthenticated();
  
  // Show/hide auth elements
  document.querySelectorAll('.auth-only').forEach(el => {
    el.style.display = isLoggedIn ? 'block' : 'none';
  });
  
  document.querySelectorAll('.guest-only').forEach(el => {
    el.style.display = isLoggedIn ? 'none' : 'block';
  });
  
  // Enable/disable protected content
  document.querySelectorAll('.protected-content').forEach(el => {
    if (isLoggedIn) {
      el.classList.remove('disabled-content');
    } else {
      el.classList.add('disabled-content');
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  // Auth modal toggle
  document.getElementById('authBtn')?.addEventListener('click', () => {
    document.getElementById('authModal').style.display = 'flex';
  });
  
  // Close modals
  document.querySelectorAll('.modal .back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });
  
  // Register form
  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
      await auth.register(username, password);
      alert('✅ تم التسجيل بنجاح!');
      document.getElementById('authModal').style.display = 'none';
      updateAuthUI();
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  });
  
  // Login form
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
      await auth.login(username, password);
      alert('✅ تم تسجيل الدخول بنجاح!');
      document.getElementById('authModal').style.display = 'none';
      updateAuthUI();
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  });
  
  // Logout button
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    auth.logout();
    updateAuthUI();
    alert('تم تسجيل الخروج');
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);
