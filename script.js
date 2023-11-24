function responsive() {
    let x = document.getElementById("topnav");
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav'
    }
}

function search() {
    let x = document.getElementById("search-container");
    if(x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}