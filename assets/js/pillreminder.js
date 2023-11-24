let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));
let container = document.getElementById("tabletlist");
for(let element of fhi_reminder) {
  if(element.email == fhi_login) {
    let div = document.createElement("div");
    div.setAttribute("class","reminder-container");
    div.innerHTML = `
    <img class="tablet-image" src="${element.tabletImage}" alt="Tablet Image">
    <table>
      <tr>
        <th>Tablet Name</th>
        <td>${element.tabletName}</td>
      </tr>
      <tr>
        <th>Tablet Remaining</th>
        <td>${(element.tabletCount > 1) ? element.tabletCount + " Tablets" : element.tabletCount + " Tablet"}</td>
      </tr>
      <tr>
        <th>Dosage Type</th>
        <td>${element.dosageType}</td>
      </tr>
      <tr>
        <th>Dosage Quantity</th>
        <td>${element.dosageQuantity}</td>
      </tr>
      <tr>
        <th>When to Take</th>
        <td>${element.whenToTake}</td>
      </tr>
      <tr>
        <th>Time for Medicine</th>
        <td>${element.timeForMedicine}</td>
      </tr>
    </table>
    <div style="margin-top: 20px;">
    <a href="edittablet.html?id=${element.id}" class="btn">Edit</a>
    <button type="button" id="delete" onclick="deletetablet(${element.id})" class="btn">Delete</button>
  </div>
    `;
    container.append(div);

    let splittime = element.timeForMedicine.split(":"); 
    const notificationHour = splittime[0]; 
    const notificationMinute = splittime[1]; 
    let tabletname = element.tabletName;
    let tabletimage = element.tabletImage;
    let dosagequantity = element.dosageQuantity;
    let whenTotake = element.whenToTake;
    let tabletId = element.id;
    let path = window.location.href;
    scheduleDailyNotification(notificationHour, notificationMinute, tabletname, tabletimage,dosagequantity,whenTotake,tabletId,path);
  }
}

function deletetablet(id) {
let msg = confirm("Are you Sure, You want to delete ?");
if (msg) {
  let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
  let findIndex = fhi_reminder.findIndex((value) => value.id == id);
  fhi_reminder.splice(findIndex, 1);
  localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
  window.location.reload();
}
}

function notifyMe(tabletname, tabletimage,dosagequantity,whenTotake,tabletId,path) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        const notification = new Notification("Medicine Reminder", {
            body: `Did you take ${tabletname}?\nYou have to take the medicine quantity of ${dosagequantity}.\nYou must take the medicine ${whenTotake}.`,
            image: tabletimage
          });
          notification.onclick = function () {
            window.open(`${path}?fromNotification=true&tabletId=${tabletId}`);
        };
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            const notification = new Notification("Medicine Reminder", {
                body: `Did you take ${tabletname}?\nYou have to take the medicine quantity of ${dosagequantity}.\nYou must take the medicine ${whenTotake}.`,
                image: tabletimage
            });
            notification.onclick = function () {
                window.open(`${path}?fromNotification=true&tabletId=${tabletId}`);
            };
        }
      });
    }
}

  function scheduleDailyNotification(hour, minute, tabletname, tabletimage,dosagequantity, whenTotake,tabletId,path) {
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      0
    );
  
    const timeUntilNotification = scheduledTime - now;
  
    if (timeUntilNotification > 0) {
      setTimeout(() => {
        notifyMe(tabletname, tabletimage,dosagequantity,whenTotake,tabletId,path);
      }, timeUntilNotification);
    }
  }


const urlParams = new URLSearchParams(window.location.search);
const fromNotification = urlParams.get('fromNotification');
const tabletId = urlParams.get('tabletId');

if (fromNotification === 'true') {
  const userResponse = confirm("Did you take the medicine?");
  if (userResponse) {
    console.log(tabletId);
    let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
    let findObj = fhi_reminder.find((value) => value.id == tabletId);
    let tabletCount = findObj.tabletCount-1;
    let newObj = {
        tabletCount,
    };
    Object.assign(findObj,newObj);
    localStorage.setItem("fhi_reminder",JSON.stringify(fhi_reminder));
    console.log(fhi_reminder);
    window.location.href = "pillreminder.html";
  }
}
