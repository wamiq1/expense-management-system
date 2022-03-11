let guard = localStorage.getItem("authentication");

if (guard ===  null) {
    window.location.href = "/login.html"
}