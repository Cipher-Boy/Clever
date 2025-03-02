document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('#signUpForm');
    const signInForm = document.querySelector('#signInForm');

    if (signUpForm) {
        signUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;

            // Handle sign-up logic here
            signUp(username, password);
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;

            // Handle sign-in logic here
            signIn(username, password);
        });
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
    // Example of a simple sign-in function
    // You can replace this with your actual sign-in logic
    console.log('Signing in with username:', username, 'and password:', password);

    // Simulate a successful sign-in
    alert('Sign-in successful!');

    // Redirect to the home page or another page
    window.location.href = 'index.html';
}