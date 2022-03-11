let users = [];
let getUserFromLocal = localStorage.getItem('users');
if (getUserFromLocal) {
    users = JSON.parse(getUserFromLocal)
}
function showMessages(message) {
    document.getElementById("validationPassword").innerHTML = message
}
function validatePassword(password) {
    if (password == "") {
        showMessages("Password field in required") 
        return false;
    } else if (password.length < 8) {
        console.log("8")
        showMessages("Password length must be atleast 8 characters")
        return false;
    }else if (password.length > 15) {
        showMessages("Password length must be atleast 15 characters")
        return false;
    } else {
        return true
    }
}

function signup() {
    event.preventDefault();

    let username = document.getElementById('signupInputUsername').value;
    let email = document.getElementById('signupInputEmail').value;
    let password = document.getElementById('signupInputPassword').value;
    let confirmPassword = document.getElementById('signupInputConfirmPassword').value;

    let userObj = {
        username,
        email,
        password,
        confirmPassword
    }

    let getUsersEmails = users.map(em => em.email);
    let getUsersUsername = users.map(em => em.username);

    if (!getUsersEmails.includes(userObj.email) && users !== null && !getUsersUsername.includes(userObj.username)) {
        
        const isValid = validatePassword(password);
        if (isValid) {
            users.push(userObj);
            swal("Success", "You're Account has been Registered", "success");
            localStorage.setItem('users', JSON.stringify(users));
            return
        }
    } 
    else if (getUsersEmails.includes(userObj.email)) {
        swal("Errorr", "Email has already taken", "error");
    }
    else if (getUsersUsername.includes(userObj.username)) {
        swal("Errorr", "Username has already taken", "error");
    }
    else {
        swal("Errorr", "Registration Failed", "error");
    }
    
}

function signIn() {
    event.preventDefault();

    let email = document.getElementById('signinInputEmail').value;
    let password = document.getElementById('signinInputPassword').value;

    let loginUser = {
        email,
        password
    }

    users.forEach(user => {
        if (user.email === email && user.password === password) {
            localStorage.setItem("authentication", JSON.stringify(loginUser));
            window.location.href = "/dashboard/dashboard.html";
        }
    }) 

}