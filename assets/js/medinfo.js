let searchbar = document.getElementById("search-meds");
searchbar.addEventListener("keypress", (event)=> {
if (event.key === 'Enter') {
    event.preventDefault();
        const drugName = searchbar.value.trim();
        const apiUrl = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`;
  
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            displayDrugInformation(data);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
}
})

function displayDrugInformation(data) {
    const drugInfoDiv = document.getElementById('drugInfo');
    document.getElementById("termsandconditions").style.display = "none";
    drugInfoDiv.innerHTML = JSON.stringify(data, null, 2);
    console.log(data);
  }