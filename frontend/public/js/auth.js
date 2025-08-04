const API_URL = 'http://localhost:5000';

// Authentication functions
export const auth = {
  // Store token in localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  },
  
  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },
  
  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },
  
  // Register user
  async register(username, password) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'فشل التسجيل');
      
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Login user
  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'فشل تسجيل الدخول');
      
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Logout user
  logout() {
    this.removeToken();
  }
};
