// Start Settings Box
if (localStorage.getItem("color-option")) {
   document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"))

   document.querySelectorAll(".color-list li").forEach((el) => {
      el.classList.remove("active")
      if (el.dataset.color === localStorage.getItem("color-option")) {
         el.classList.add("active")
      }
   })
}

let backgroundOption = true;
let backgroundInterval;

if (localStorage.getItem("background_option")) {
   document.querySelectorAll(".random-background span").forEach(el => {
      el.classList.remove("active")
   })

   if (localStorage.getItem("background_option") === 'true') {
      backgroundOption = true
      document.querySelector(".random-background .yes").classList.add("active")
   } else {
      backgroundOption = false
      document.querySelector(".random-background .no").classList.add("active")
   }
}

document.querySelector('.setting').onclick = function () {
   this.classList.toggle('fa-spin');
   document.querySelector('.settings-box').classList.toggle('open');
};

const colorList = document.querySelectorAll(".color-list li")

colorList.forEach(li => {
   li.addEventListener("click", (e) => {
      document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
      localStorage.setItem("color-option", e.target.dataset.color)
      // Remove active Class From All lis
      handleAvtive(e)
   })
})

const backgroundbtns = document.querySelectorAll(".random-background span")

backgroundbtns.forEach(span => {
   span.addEventListener("click", (e) => {
      handleAvtive(e)

      if (e.target.dataset.background === "yes") {
         backgroundOption = true
         randomaiz()
         localStorage.setItem("background_option", true)
      } else {
         backgroundOption = false
         clearInterval(backgroundInterval)
         localStorage.setItem("background_option", false)
      }
   })
})

let bulletsSpan = document.querySelectorAll(".bullets-option span")
let navBullets = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullet-option")

if (bulletLocalItem !== null) {
   bulletsSpan.forEach(span => {
      span.classList.remove("active")
   })
   if (bulletLocalItem === "block") {
      navBullets.style.display = "block"
      document.querySelector(".bullets-option .yes").classList.add("active")
   } else {
      navBullets.style.display = "none"
      document.querySelector(".bullets-option .no").classList.add("active")
   }
}
// End Settings Box

// Start Landing Page
let landingPage = document.querySelector('.landing-page');
let imgsArray = ["01.jpg", "02.jpg", "04.jpg", "05.jpg", "06.png", "07.jpg", "08.jpg", "09.jpg"];

function randomaiz() {
   if (backgroundOption === true) {
      backgroundInterval = setInterval(() => {
         let randomNumber = Math.floor(Math.random() * imgsArray.length);
         landingPage.style.transition = '0.8s';
         landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
      }, 5000);
   }
}
randomaiz()
// End Landing Page
// Start Fixed Header
let header = document.querySelector('.header-area')

// End Fixed Header
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

   if (window.scrollY >= 150) {
      header.classList.add('fixed');
   } else header.classList.remove('fixed');

   // Skills Offset Top
   let skillsOffsetTop = ourSkills.offsetTop;

   // Skills Outer Height
   let skillsOuterHeight = ourSkills.offsetHeight;

   // Window Height
   let windowHeight = this.innerHeight;

   // Window ScrollTop
   let windowScrollTop = this.scrollY;

   if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) - 300) {

      let allSkills = document.querySelectorAll(".skill-box .skill-progrres span");
      allSkills.forEach(skill => {

         skill.style.width = skill.dataset.progress;

      });
   }

   // check Windo Scroll And Change the btn status
   if (window.scrollY >= 600) {
      document.querySelector(".btn").style.display = "block"
   } else {
      document.querySelector(".btn").style.display = "none"
   }
};

// Start Gallery
let ourGallery = document.querySelectorAll(".our-gallery img")

// Loop On Our Gallery Imgs
ourGallery.forEach(img => {
   img.addEventListener("click", () => {
      // Create Overlay Element
      let overlay = document.createElement("div")
      // Set class on Overlay
      overlay.className = "overlay"
      // Add Overlay Element To body
      document.body.appendChild(overlay)

      // Create popup box 
      let popupBox = document.createElement("div")

      // Set class on popup box
      popupBox.className = "popup-box"

      // Create popup Img
      let popupImg = document.createElement("img")

      // Set class on popup box
      popupImg.className = "popup-img"

      // Set src image to popup image
      popupImg.src = img.src

      // Append popup img to popup box
      popupBox.appendChild(popupImg)

      // Add popup box To body
      document.body.append(popupBox)

      if (img.alt !== null) {
         let imageName = document.createElement("h3")
         imageName.textContent = img.alt
         popupBox.prepend(imageName)
      }

      let closeButton = document.createElement("span")
      closeButton.textContent = 'X'
      closeButton.className = "close-button"
      popupBox.append(closeButton)
   })
})
// End Gallery

// close Span
document.addEventListener("click", function (e) {

   if (e.target.className == 'overlay' || e.target.className == 'close-button') {

      // Remove Overlay
      document.querySelector('.overlay').remove();

      // Remove popup Box
      document.querySelector('.popup-box').remove();

      document.querySelector('.overlay').remove();
   }
});

// Set Year To Timeline
let yearEl = document.querySelector(".timeline-content .year")
let data = new Date

yearEl.textContent = data.getFullYear()

// Set Year To Footer
let footSpan = document.querySelector("footer span")

footSpan.textContent = data.getFullYear()

// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet")

allBullets.forEach(bullet => {
   bullet.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
         behaivor: "smooth"
      })
   })
})

// Handle Active State

function handleAvtive(e) {
   // Remove active Class From All childreen
   e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active")
   })
   // Add active Class on traget child
   e.target.classList.add("active")
}

bulletsSpan.forEach(span => {
   span.addEventListener("click", (e) => {
      if (span.dataset.status === "show") {
         navBullets.style.display = "block"
         localStorage.setItem("bullet-option", "block")
      } else {
         navBullets.style.display = "none"
         localStorage.setItem("bullet-option", "none")
      }
      handleAvtive(e)
   })
})

document.querySelector(".reset-options").addEventListener("click", () => {
   localStorage.clear()
   window.location.reload()
})

// handle links popup
let linksBtn = document.querySelector(".links-container .toggle-menu")
let headLinks = document.querySelector(".links-container .links")
let allLinks = document.querySelectorAll(".links-container .links a")

linksBtn.onclick = function (e) {

   // Stop Propagation
   e.stopPropagation();

   // Toggle Class "menu-active" On Button
   this.classList.toggle("menu-active");

   // Toggle Class "open" On Links
   headLinks.classList.toggle("open");

   // handle Settings Box If Links Popup is open
   if (headLinks.classList.contains("open")) {
      document.querySelector('.settings-box').style.zIndex = "1000"
   } else {
      document.querySelector('.settings-box').style.zIndex = "1001"
   }

};

if (linksBtn.style.display !== "none") {
   allLinks.forEach(li => {
      li.addEventListener("click", () => {
         // Toggle Class "menu-active" On Button
         linksBtn.classList.toggle("menu-active");

         // Toggle Class "open" On Links
         headLinks.classList.toggle("open");
      })
   })
}

// click on every Where But Not Button And Links
document.addEventListener("click", (e) => {
   if (e.target !== linksBtn && e.target !== headLinks) {
      if (headLinks.classList.contains("open")) {
         // Toggle Class "menu-active" On Button
         linksBtn.classList.toggle("menu-active");

         // Toggle Class "open" On Links
         headLinks.classList.toggle("open");
      }
   }

})

headLinks.onclick = (e) => {
   e.stopPropagation()
}
