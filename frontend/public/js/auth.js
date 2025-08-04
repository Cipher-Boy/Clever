const API_URL = 'http://localhost:5000';

// Store token in localStorage
function setAuthToken(token) {
  localStorage.setItem('token', token);
}

// Get token from localStorage
function getAuthToken() {
  return localStorage.getItem('token');
}

// Register user
async function register(username, password) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    if (response.ok) {
      setAuthToken(data.token);
      return data;
    } else {
      throw new Error(data.message || 'فشل التسجيل');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Login user
async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    if (response.ok) {
      setAuthToken(data.token);
      return data;
    } else {
      throw new Error(data.message || 'فشل تسجيل الدخول');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Check if user is authenticated
function isAuthenticated() {
  return !!getAuthToken();
}

// Get authentication headers
function getAuthHeaders() {
  return {
    'Authorization': `Bearer ${getAuthToken()}`
  };
}

// Logout user
function logout() {
  localStorage.removeItem('token');
}
