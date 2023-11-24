let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));
let checkemail = fhi_register.find((user) => user.email == fhi_login);

const searchParams = new URLSearchParams(window.location.search);
const urlid = searchParams.get('id');
let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
let findobj = fhi_reminder.find((value) => value.id == urlid);
console.log(findobj);

document.getElementById('tabletName').value = findobj.tabletName;
document.getElementById('tabletCount').value = findobj.tabletCount;
document.getElementById('dosageType').value = findobj.dosageType;
document.getElementById('dosageQuantity').value = findobj.dosageQuantity;
document.getElementById('whenToTake').value = findobj.whenToTake;
document.getElementById('timeForMedicine').value = findobj.timeForMedicine;

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
  const email = checkemail.email;

const searchParams = new URLSearchParams(window.location.search);
const urlid = searchParams.get('id');
let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
let findIndex = fhi_reminder.findIndex((value) => value.id == urlid);

  if (tabletName.trim() === "") {
    alert("Tablet Name should not be empty");
  } else {
    const reader = new FileReader();
    
    reader.onload = function (event) {
      const obj = {
        id: urlid,
        tabletName,
        tabletCount,
        tabletImage: event.target.result,
        dosageType,
        dosageQuantity,
        whenToTake,
        timeForMedicine,
        email
      };

      fhi_reminder[findIndex] = obj;
      localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
      window.location.href = "pillreminder.html";
    };
    
    reader.readAsDataURL(tabletImage);
  }
});
