// let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
// let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));
// let checkemail = fhi_register.find((user) => user.email == fhi_login);

// let form = document.getElementById("tabletForm");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const tabletName = document.getElementById('tabletName').value;
//   const tabletCount = document.getElementById('tabletCount').value;
//   const tabletImage = document.getElementById('tabletImage').files[0];
//   const dosageType = document.getElementById('dosageType').value;
//   const dosageQuantity = document.getElementById('dosageQuantity').value;
//   const whenToTake = document.getElementById('whenToTake').value;
//   const timeForMedicine = document.getElementById('timeForMedicine').value;
//   const id = Date.now();
//   const email = checkemail.email;

//   if (tabletName.trim() === "") {
//     alert("Tablet Name should not be empty");
//   } else if (tabletCount.trim() === "") {
//     alert("tablet Count should not be empty")
//   } else {
//     const reader = new FileReader();
    
//     reader.onload = function (event) {
//       const obj = {
//         tabletName,
//         tabletCount,
//         tabletImage: event.target.result,
//         dosageType,
//         dosageQuantity,
//         whenToTake,
//         timeForMedicine,
//         id,
//         email
//       };
      
//       if (localStorage.getItem("fhi_reminder") !== null) {
//         let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
//         fhi_reminder.push(obj);
//         localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
//       } else {
//         let fhi_reminder = [];
//         fhi_reminder.push(obj);
//         localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
//       }
      
//       window.location.href = "pillreminder.html";
//     };
    
//     reader.readAsDataURL(tabletImage);
//   }
// });





let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));

// Retrieve the email of the logged-in user
let checkemail = fhi_register.find((user) => user.email === fhi_login);

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

  // Basic validation checks
  if (tabletName.trim() === "") {
    alert("Tablet Name should not be empty");
    return;
  } else if (tabletCount.trim() === "") {
    alert("Tablet Count should not be empty");
    return;
  }

  // Convert image to base64 for storage
  const reader = new FileReader();
  
  reader.onload = async function (event) {
    const tabletImageUrl = event.target.result;

    const medicationData = {
      tabletName,
      tabletCount,
      tabletImage: tabletImageUrl,
      dosageType,
      dosageQuantity,
      whenToTake,
      timeForMedicine,
      id,
      email: checkemail.email // Use the logged-in user's email
    };

    // Save to localStorage (optional, if you need it locally)
    if (localStorage.getItem("fhi_reminder") !== null) {
      let fhi_reminder = JSON.parse(localStorage.getItem("fhi_reminder"));
      fhi_reminder.push(medicationData);
      localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
    } else {
      let fhi_reminder = [medicationData];
      localStorage.setItem("fhi_reminder", JSON.stringify(fhi_reminder));
    }

    // Save medication data to Firebase Firestore under the user’s document
    try {
      // Query Firestore to find the user document by email
      const userQuerySnapshot = await firebase.firestore().collection("users").where("email", "==", checkemail.email).get();

      if (!userQuerySnapshot.empty) {
        // Get the user's document reference
        const userDoc = userQuerySnapshot.docs[0];

        // Add medication data to the 'medications' sub-collection under this user document
        await userDoc.ref.collection("medications").add(medicationData);

        alert("Medication added successfully to Firebase!");
        window.location.href = "pillreminder.html";
      } else {
        alert("User not found in Firebase. Please register.");
      }
    } catch (error) {
      console.error("Error adding medication to Firebase: ", error);
      alert("Error saving medication to Firebase.");
    }
  };

  reader.readAsDataURL(tabletImage);
});
