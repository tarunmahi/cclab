// let form = document.getElementById("form");
// form.addEventListener("submit", (event) => {
// event.preventDefault();

// let name = document.getElementById("name").value;
// let mobile = document.getElementById("mobile").value;
// let email = document.getElementById("email").value;
// let password = document.getElementById("password").value;

// let obj = {
//     name,
//     mobile,
//     email,
//     password
// };

// if(name.trim() === "") {
//    alert("name should not be empty");
// } else if(mobile.trim() === "") {
//     alert("mobile number should not be empty");
//  } else if (mobile.trim().length !== 10) {
//     alert("mobile number length should be 10");
//  } else if(email.trim() === "") {
//     alert("email should not be empty");
//  } else if(password.trim() === "") {
//     alert("password should not be empty");
//  } else if(password.trim().length < 8) {
//     alert("password length should be greater than 8");
// } else {

// let fhi_register = JSON.parse(localStorage.getItem("fhi_register"))  || [];
// let checkemail = fhi_register.find((user) => user.email == email);
// if(checkemail){
//    alert("User Already Exist! kindly Login");
//    window.location.href = "login.html";
// } else {
//    if(localStorage.getItem("fhi_register") != null){
//       let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
//       fhi_register.push(obj);
//       localStorage.setItem("fhi_register",JSON.stringify(fhi_register));
//   } else {
//       let fhi_register = [];
//       fhi_register.push(obj);
//       localStorage.setItem("fhi_register",JSON.stringify(fhi_register));
//   }
//   window.location.href = "../pages/login.html";
// }

// }
// });


// // Disable right-click
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

const api='http://localhost:3000';


let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let obj = {
        name,
        mobile,
        email,
        password
    };

    // Basic validation checks
    if (name.trim() === "") {
        alert("Name should not be empty");
    } else if (mobile.trim() === "") {
        alert("Mobile number should not be empty");
    } else if (mobile.trim().length !== 10) {
        alert("Mobile number length should be 10");
    } else if (email.trim() === "") {
        alert("Email should not be empty");
    } else if (password.trim() === "") {
        alert("Password should not be empty");
    } else if (password.trim().length < 8) {
        alert("Password length should be greater than 8");
    } else {
        let fhi_register = JSON.parse(localStorage.getItem("fhi_register")) || [];
        let checkemail = fhi_register.find((user) => user.email === email);

        if (checkemail) {
            alert("User Already Exist! Kindly Login");
            window.location.href = "login.html";
        } else {
            // Save to local storage
            fhi_register.push(obj);
            localStorage.setItem("fhi_register", JSON.stringify(fhi_register));

            axios.post(`${api}/register`, obj)
            .then((response) => {
                if (response.status === 200) {
                    alert("Registration successful!");
                    window.location.href = "../pages/login.html";
                } else {
                    alert("Error in registration.");
                }
            })
            .catch((error) => {
                console.error("Error sending request to backend: ", error);
                alert("Error saving to server.");
            });

            // Save to Firebase Firestore
            // firebase.firestore().collection("users").add(obj)
            //     .then(() => {
            //         alert("Registration successful!");
            //         window.location.href = "../pages/login.html";
            //     })
            //     .catch((error) => {
            //         console.error("Error adding document to Firebase: ", error);
            //         alert("Error saving to Firebase.");
            //     });
        }
    }
});

// Disable right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//     if (
//         e.keyCode === 123 ||
//         ctrlShiftKey(e, 'I') ||
//         ctrlShiftKey(e, 'J') ||
//         ctrlShiftKey(e, 'C') ||
//         (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//     ) return false;
// };
