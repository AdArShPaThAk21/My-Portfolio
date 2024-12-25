document.getElementById('menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('sidemenu');
  menu.classList.toggle('active');
});


// ----------------------------------------------------------

let ws = document.querySelectorAll(".word");
ws.forEach(w => {
    w.innerHTML = w.textContent.split("").map(l => `<span class="letter">${l}</span>`).join("");
});
let i = 0;
const max = ws.length - 1;
ws[i].style.opacity = "1";

function changeText() {
    let cur = ws[i];
    let next = i === max ? ws[0] : ws[i + 1];
    Array.from(cur.children).forEach((l, idx) => {
        setTimeout(() => l.className = "letter out", idx * 80);
    });
    next.style.opacity = "1";
    Array.from(next.children).forEach((l, idx) => {
        l.className = "letter behind";
        setTimeout(() => l.className = "letter in", 340 + idx * 80);
    });
    i = i === max ? 0 : i + 1;
}
changeText();
setInterval(changeText, 3000);

// --------------------------------------------------------------

var links = document.getElementsByClassName("links");
var contents = document.getElementsByClassName("contents");
function opentab(tabname){
    for (link of links){
        link.classList.remove("active-link");
    }
    for (content of contents){
        content.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        var dots = parseInt(circle.getAttribute("data-dots"));
        var marked = parseInt(circle.getAttribute("data-percent"));
        var percent = Math.floor((marked / 100) * dots);
        var points = "";
        var rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }
        circle.innerHTML = points;
    });
});


// ----------------------------------------------------------------
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const resultSpan = document.getElementById('result');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();
      resultSpan.textContent = "Sending....";
      
      const formData = new FormData(form);
      formData.append("access_key", "6c815af1-346c-4fd6-981b-95d4b91ee003");

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();

          if (data.success) {
              resultSpan.textContent = "Form Submitted Successfully";
              form.reset();
          } else {
              console.log("Error", data);
              resultSpan.textContent = data.message;
          }
      } catch (error) {
          console.error("Submission error", error);
          resultSpan.textContent = "An error occurred while submitting the form.";
      }
  });
});

// ----------------------------------------------------------------

document.querySelectorAll('.slider').forEach(slider => {
  const btns = slider.querySelectorAll(".btnnn");
  const slideRow = slider.querySelector(".slider-inner");
  const container = slider.closest('.container6');

  let currentIndex = 0;
  const totalSlides = btns.length;
  const autoSlideInterval = 3000;

  const updateSlide = () => {
    const containerWidth = container.offsetWidth;
    slideRow.style.transform = `translateX(${-currentIndex * containerWidth}px)`;
    btns.forEach((btn, i) => btn.classList.toggle("active", i === currentIndex));
  };

  const goToNextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  };

  let autoSlideTimer = setInterval(goToNextSlide, autoSlideInterval);

  slider.addEventListener("mouseover", () => clearInterval(autoSlideTimer));
  slider.addEventListener("mouseout", () => autoSlideTimer = setInterval(goToNextSlide, autoSlideInterval));

  btns.forEach((btn, i) => btn.addEventListener("click", () => {
    currentIndex = i;
    updateSlide();
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(goToNextSlide, autoSlideInterval);
  }));

  window.addEventListener("resize", updateSlide);
});
