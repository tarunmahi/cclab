let form = document.getElementById("loginform");
form.addEventListener("submit", (event) => {
event.preventDefault();

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if(email.trim() === "") {
    alert("email should not be empty");
} else if(password.trim() === "") {
    alert("password should not be empty");
} else if(password.trim().length < 8) {
    alert("password length should be greater than 8");
} else if(!/[A-Z]/.test(password)) {
    alert("password must contains atleast one uppercase letter");
} else if(!/[a-z]/.test(password)) {
    alert("password must contains atleast one lowercase letter");
} else if(!/[0-9]/.test(password)) {
    alert("password must contains atleast numbers");
} else if(!/[^a-zA-Z0-9]/.test(password)) {
    alert("password must contains atleast symbols");
} else {
    let fhi_register = JSON.parse(localStorage.getItem("fhi_register")) || [];
    let checkemail = fhi_register.find((user) => user.email == email && user.password == password);
    if(checkemail){
        localStorage.setItem("fhi_login",JSON.stringify(email));
        window.location.href = "home.html";
    } else {
        alert("User failed to Login!");
    }
}
});

// Disable right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, 'I') ||
//     ctrlShiftKey(e, 'J') ||
//     ctrlShiftKey(e, 'C') ||
//     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//   )
//     return false;
// };
