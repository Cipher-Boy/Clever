document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('#signUpForm');
    const signInForm = document.querySelector('#signInForm');

    if (signUpForm) {
        signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.querySelector('#signUpUsername').value;
            const password = document.querySelector('#signUpPassword').value;

            // Handle sign-up logic here
            signUp(username, password);
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.querySelector('#signInUsername').value;
            const password = document.querySelector('#signInPassword').value;

            // Handle sign-in logic here
            signIn(username, password);
        });
    }

    // Display username if logged in
    const loggedInUsername = localStorage.getItem('username');
    if (loggedInUsername) {
        displayUsername(loggedInUsername);
    }
});

function signUp(username, password) {
    fetch('signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
    .then(response => response.text()) // Get the response as text
    .then(text => {
        try {
            const data = JSON.parse(text); // Try to parse the text as JSON
            if (data.status === 'success') {
                alert('Sign-up successful!');
                window.location.href = 'sign_in.html';
            } else {
                alert('Sign-up failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error, text);
            alert('Sign-up failed: Invalid server response');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign-up failed: ' + error.message);
    });
}

function signIn(username, password) {
    fetch('signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
    .then(response => response.text()) // Get the response as text
    .then(text => {
        try {
            const data = JSON.parse(text); // Try to parse the text as JSON
            if (data.status === 'success') {
                localStorage.setItem('username', username); // Store username in localStorage
                alert('Sign-in successful!');
                window.location.href = 'index.html';
            } else {
                alert('Sign-in failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error, text);
            alert('Sign-in failed: Invalid server response');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign-in failed: ' + error.message);
    });
}

function displayUsername(username) {
    const navContainer = document.querySelector('.nav-container');
    const userDisplay = document.createElement('div');
    userDisplay.className = 'user-display';
    userDisplay.innerHTML = `<span>Welcome, ${username}</span>`;
    navContainer.appendChild(userDisplay);
}