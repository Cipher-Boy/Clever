// Common functions for all pages

// Initialize authentication
function initAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    // Update UI for logged-in user
    document.querySelectorAll('.auth-only').forEach(el => {
      el.style.display = 'block';
    });
    document.querySelectorAll('.guest-only').forEach(el => {
      el.style.display = 'none';
    });
  } else {
    // Update UI for guest
    document.querySelectorAll('.auth-only').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.guest-only').forEach(el => {
      el.style.display = 'block';
    });
  }
}

// Show/hide modals
function showModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function hideModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  
  // Add event listeners for modals
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      showModal(button.dataset.modal);
    });
  });
  
  document.querySelectorAll('.modal .back-btn').forEach(button => {
    button.addEventListener('click', () => {
      hideModal(button.closest('.modal').id);
    });
  });
});
