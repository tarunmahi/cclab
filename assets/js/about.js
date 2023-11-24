window.addEventListener('scroll', function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.height = scrolled + '%';
});

function responsive() {
    let x = document.getElementById("topnav");
    if (x.className === 'topnav') {
        x.className += ' responsive';
        let progress = document.querySelector(".progress-container");
        progress.style.marginTop = "150%";
    } else {
        x.className = 'topnav';
        let progress = document.querySelector(".progress-container");
        progress.style.marginTop = "13.5%";
        window.location.reload();
    }
}

let originalMarginTop;
function search() {
  let x = document.getElementById("search-container");
  let progress = document.querySelector(".progress-container");
  if (!originalMarginTop) {
    const computedStyle = window.getComputedStyle(progress);
    originalMarginTop = parseFloat(computedStyle.getPropertyValue("margin-top"));
  }
  if (x.style.display === "none") {
    x.style.display = "block";
    const newMarginTop = originalMarginTop + 167;
    progress.style.marginTop = `${newMarginTop}px`;
  } else {
    x.style.display = "none";
    progress.style.marginTop = `${originalMarginTop}px`;
  }
}
