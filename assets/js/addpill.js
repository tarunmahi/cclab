let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));
let checkemail = fhi_register.find((user) => user.email == fhi_login);

let form = document.getElementById("tabletForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const tabletName = document.getElementById('tabletName').value;
  const tabletCount = document.getElementById('tabletCount').value;
  const tabletImage = document.getElementById('tabletImage').files[0];
  const dosageType = document.getElementById('dosageType').value;
  const dosageQuantity = document.getElementById('dosageQuantity').value;
  const whenToTake = document.getElementById('whenToTake').value;
  const timeForMedicine = document.getElementById('timeForMedicine').value;
  const id = Date.now();
  const email = checkemail.email;

  if (tabletName.trim() === "") {
    alert("Tablet Name should not be empty");
  } else if (tabletCount.trim() === "") {
    alert("tablet Count should not be empty")
  } else {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      const obj = {
        tabletName,
        tabletCount,
        tabletImage: event.target.result,
        dosageType,
        dosageQuantity,
        whenToTake,
        timeForMedicine,
        id,
        email
      };
      
      if (localStorage.getItem("fhi_reminder") !== null) {
        let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
        fhi_reminder.push(obj);
        localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
      } else {
        let fhi_reminder = [];
        fhi_reminder.push(obj);
        localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
      }
      
      window.location.href = "pillreminder.html";
    };
    
    reader.readAsDataURL(tabletImage);
  }
});
