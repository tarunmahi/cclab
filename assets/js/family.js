let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder1"));
console.log(fhi_reminder);
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
          <th>Family Member Name</th>
          <td>${element.Name}</td>
        </tr>
        <tr>
          <th>Relationship</th>
          <td>${element.Relationship}</td>
        </tr>
        <tr>
          <th>Date of birth</th>
          <td>${element.dob}</td>
        </tr>
        <tr>
          <th>Age</th>
          <td>${element.age}</td>
        </tr>
        <tr>
          <th>Phone number</th>
          <td>${element.Phone_num}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${element.email}</td>
        </tr>
        <tr>
            <th>Medical conditions if any </th>
            <td>${element.medical}</td>
      </table>
      <div style="margin-top: 20px;">
      <a href="edittablet.html?id=${element.id}" class="btn">Edit</a>
      <button type="button" id="delete" onclick="deletetablet(${element.id})" class="btn">Delete</button>
    </div>
      `;
      container.append(div);



    
  }
}

function deletetablet(id) {
    let msg = confirm("Are you Sure, You want to delete ?");
    if (msg) {
      let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder1"));
      let findIndex = fhi_reminder.findIndex((value) => value.id == id);
      fhi_reminder.splice(findIndex, 1);
      localStorage.setItem("fhi_reminder1", JSON.stringify(fhi_reminder));
      window.location.reload();
    }
    }