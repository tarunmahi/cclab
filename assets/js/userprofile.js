let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));
let checkemail = fhi_register.find((user) => user.email == fhi_login);

document.getElementById("name").value = checkemail.name;
document.getElementById("mobile").value = checkemail.mobile;
document.getElementById("email").value = checkemail.email;

let edit = document.getElementById("edit");
let submit = document.getElementById("submit");
let logout = document.getElementById("logout");
let deletebtn = document.getElementById("delete");

edit.addEventListener("click", (event) => {
    event.preventDefault();

    submit.style.display = "block";
    document.getElementById("name").disabled = false;
    document.getElementById("mobile").disabled = false;

})


submit.addEventListener("click", (event) => {
    event.preventDefault();

    let checkemail = fhi_register.find((user) => user.email == fhi_login);

    document.getElementById("name").disabled = true;
    document.getElementById("mobile").disabled = true;

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;

    let newobj = {
        name,
        mobile,
        email
    }

    Object.assign(checkemail,newobj);
    localStorage.setItem("fhi_register",JSON.stringify(fhi_register));
    alert("Profile Updated Successfully!")
    window.location.reload();
})

logout.addEventListener("click", (event) => {
  event.preventDefault();
  let msg = confirm("Are you sure, you want to Logout ?");
  if (msg) {
    localStorage.removeItem("fhi_login");
    window.location.href = "login.html";
  }
});

deletebtn.addEventListener("click", (event) => {
  event.preventDefault();
  let msg = confirm("Are you sure, you want to delete your profile ?");
  if (msg) {
    let findIndex = fhi_register.findIndex((user) => user.email == fhi_login);
    fhi_register.splice(findIndex,1);
    localStorage.setItem("fhi_register",JSON.stringify(fhi_register));
    window.location.href = "register.html";
  }
});

