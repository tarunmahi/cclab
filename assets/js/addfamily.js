

let fhi_register = JSON.parse(localStorage.getItem("fhi_register"));
console.log(fhi_register);
let fhi_login = JSON.parse(localStorage.getItem("fhi_login"));
console.log(fhi_login);
// Retrieve the email of the logged-in user
let checkemail = fhi_register.find((user) => user.email === fhi_login);
console.log("hii");
let form = document.getElementById("famForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const Name = document.getElementById('family_name').value;
  const Relationship = document.getElementById('rel').value;
  const tabletImage = document.getElementById('tabletImage').files[0];
  const dob = document.getElementById('dob').value;
  const age = document.getElementById('age').value;
  const Phone_num = document.getElementById('phone_num').value;
  const email=document.getElementById('email').value;
  const medical = document.getElementById('medicalConditions').value;
  const id = Date.now();



  // Convert image to base64 for storage
  const reader = new FileReader();
  
  reader.onload = async function (event) {
    const tabletImageUrl = event.target.result;

    const FamilyData = {
      Name,
      Relationship,
      tabletImage: tabletImageUrl,
      dob,
      age,
      Phone_num,
      email,
      medical,
      id,
      email: checkemail.email // Use the logged-in user's email
    };

    // Save to localStorage (optional, if you need it locally)
    if (localStorage.getItem("fhi_reminder1") !== null) {
      let fhi_reminder1 = JSON.parse(localStorage.getItem("fhi_reminder1"));
      fhi_reminder1.push(FamilyData);
      console.log(FamilyData);
      localStorage.setItem("fhi_reminder1", JSON.stringify(fhi_reminder1));
    } else {
      let fhi_reminder1 = [FamilyData];
      localStorage.setItem("fhi_reminder1", JSON.stringify(fhi_reminder1));
      console.log(fhi_reminder1);
    }

    // Save medication data to Firebase Firestore under the user’s document
    try {
      // Query Firestore to find the user document by email
      const userQuerySnapshot = await firebase.firestore().collection("users").where("email", "==", checkemail.email).get();

      if (!userQuerySnapshot.empty) {
        // Get the user's document reference
        const userDoc = userQuerySnapshot.docs[0];

        // Add medication data to the 'medications' sub-collection under this user document
        await userDoc.ref.collection("familydetails").add(FamilyData);

        alert("/family details  added successfully to Firebase!");
        window.location.href = "family.html";
      } else {
        alert("User not found in Firebase. Please register.");
      }
    } catch (error) {
      console.error("Error adding family to Firebase: ", error);
      alert("Error saving family to Firebase.");
    }
  };

  reader.readAsDataURL(tabletImage);
});
