
let authToken = ''; // Store the token globally

// Handle Signup
document.getElementById('SignupForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/user/signupUser', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ username, email, password })
            
        });

        const result = await response.json();
        alert(result.msg);

        if(response.ok) {
            document.getElementById('SignupForm').reset();
        }

    } catch(error) {
        console.error('Error: ', error);
    }

});

//Handle Login
document.getElementById('LoginForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch("http://localhost:5000/api/user/loginUser", {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        alert(result.msg);

        if(response.ok) {
            authToken = result.token;  // Save token
            localStorage.setItem('token', result.token);
            document.getElementById('LoginForm').reset();
            document.getElementById('changePasswordSection').style.display = 'block';
            document.getElementById('logoutButton').style.display = 'inline';
        }

    } catch(error) {
        console.log('Error: ', error);
    }
})

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Frontend check for matching passwords
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;  // Early exit if passwords don't match
    }


    if(!authToken) {
        alert('Authentication token is missing. Please try again later.');
        return;
    }

    //console.log('Sending request with data:', { oldPassword, newPassword, confirmPassword });  debugging 

    try {
        const response = await fetch("http://localhost:5000/api/user/change-password", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, 
            },

            body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
            credentials: 'include',

        });

        //console.log('Authorization Token:', authToken); debugging


        const result = await response.json();
        alert(result.msg);

        if(response.ok) {
            document.getElementById('changePasswordForm').reset();
        }
    } catch(error) {
        console.log('Error: ', error);
    }

})

async function logoutUser() {
    try {
        const response = await fetch('http://localhost:5000/api/user/logout', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}`}
        })

        const result2 = await response.json();
        alert(result2.msg);

        if(response.ok) {
            localStorage.removeItem('token')
            document.getElementById('changePasswordSection').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'none';
        }

    } catch(error) {
        console.log('Error: ', error);
    }
   
}