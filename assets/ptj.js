const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== NEO ADMIN PANEL ====================*/
(function () {
  const adminPanel = document.getElementById("admin-panel");
  if (!adminPanel) return;

  const homeTitle = document.getElementById("home-title");
  const adminCloseBtn = document.getElementById("admin-close");
  const adminAuthWrapper = document.getElementById("admin-auth");
  const adminDashboard = document.getElementById("admin-dashboard");
  const adminPasswordInput = document.getElementById("admin-password");
  const adminLoginBtn = document.getElementById("admin-login");
  const adminError = document.getElementById("admin-error");
  const adminViewCount = document.getElementById("admin-view-count");
  const maintenanceToggle = document.getElementById("maintenance-toggle");
  const announcementToggle = document.getElementById("announcement-toggle");
  const announcementMessage = document.getElementById("announcement-message");
  const announcementSave = document.getElementById("announcement-save");
  const announcementBanner = document.getElementById("announcement-banner");
  const announcementText = document.getElementById("announcement-text");
  const maintenanceBanner = document.getElementById("maintenance-banner");

  const ADMIN_PASSWORD = "awm4rkzw";
  const VIEW_KEY = "neo__view_count";
  const STATE_KEY = "neo__admin_state";
  const defaultAdminState = {
    maintenance: false,
    announcementEnabled: false,
    announcement: "Shipping fresh experiments. Stay tuned!",
  };

  let adminUnlocked = false;
  let adminState = loadAdminState();
  const currentViews = incrementViewCount();
  updateViewCountDisplay(currentViews);
  renderAdminState();

  if (homeTitle) {
    let clickCounter = 0;
    let clickTimer;
    homeTitle.addEventListener("click", () => {
      clickCounter += 1;
      if (clickCounter === 3) {
        clickCounter = 0;
        openAdminPanel();
      }
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCounter = 0;
      }, 500);
    });
  }

  if (adminCloseBtn) {
    adminCloseBtn.addEventListener("click", closeAdminPanel);
  }

  adminPanel.addEventListener("click", (event) => {
    if (event.target === adminPanel) {
      closeAdminPanel();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !adminPanel.classList.contains("hidden")) {
      closeAdminPanel();
    }
  });

  const attemptLogin = () => {
    if (!adminPasswordInput) return;
    const pass = adminPasswordInput.value.trim();
    if (pass === ADMIN_PASSWORD) {
      adminUnlocked = true;
      adminPasswordInput.value = "";
      if (adminError) adminError.classList.add("hidden");
      showDashboard();
    } else {
      if (adminError) adminError.classList.remove("hidden");
    }
  };

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", attemptLogin);
  }

  if (adminPasswordInput) {
    adminPasswordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        attemptLogin();
      }
    });
  }

  if (maintenanceToggle) {
    maintenanceToggle.addEventListener("change", () => {
      adminState.maintenance = maintenanceToggle.checked;
      saveAdminState();
      renderAdminState();
    });
  }

  if (announcementToggle) {
    announcementToggle.addEventListener("change", () => {
      adminState.announcementEnabled = announcementToggle.checked;
      saveAdminState();
      renderAdminState();
    });
  }

  if (announcementSave) {
    announcementSave.addEventListener("click", () => {
      const message = announcementMessage ? announcementMessage.value.trim() : "";
      adminState.announcement = message || defaultAdminState.announcement;
      if (!message) {
        adminState.announcementEnabled = false;
        if (announcementToggle) announcementToggle.checked = false;
      }
      saveAdminState();
      renderAdminState();
    });
  }

  function openAdminPanel() {
    adminPanel.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (adminUnlocked) {
      showDashboard();
    } else {
      showAuth();
    }
  }

  function closeAdminPanel() {
    adminPanel.classList.add("hidden");
    document.body.style.overflow = "";
    if (!adminUnlocked) {
      showAuth();
    }
  }

  function showDashboard() {
    if (adminAuthWrapper) adminAuthWrapper.classList.add("hidden");
    if (adminDashboard) adminDashboard.classList.remove("hidden");
    updateViewCountDisplay(
      typeof currentViews === "number" ? currentViews : getStoredViews(),
    );
    renderAdminState();
  }

  function showAuth() {
    if (adminAuthWrapper) adminAuthWrapper.classList.remove("hidden");
    if (adminDashboard) adminDashboard.classList.add("hidden");
    if (adminPasswordInput) adminPasswordInput.value = "";
    if (adminError) adminError.classList.add("hidden");
    setTimeout(() => {
      if (adminPasswordInput && adminPanel.classList.contains("hidden") === false) {
        adminPasswordInput.focus();
      }
    }, 150);
  }

  function incrementViewCount() {
    try {
      const raw = localStorage.getItem(VIEW_KEY);
      const current = raw ? parseInt(raw, 10) || 0 : 0;
      const updated = current + 1;
      localStorage.setItem(VIEW_KEY, updated);
      return updated;
    } catch (error) {
      console.warn("Unable to update views", error);
      return null;
    }
  }

  function getStoredViews() {
    try {
      const raw = localStorage.getItem(VIEW_KEY);
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch (error) {
      return 0;
    }
  }

  function updateViewCountDisplay(count) {
    if (!adminViewCount) return;
    if (typeof count === "number" && !Number.isNaN(count)) {
      adminViewCount.textContent = count;
    } else {
      adminViewCount.textContent = "N/A";
    }
  }

  function loadAdminState() {
    try {
      const stored = localStorage.getItem(STATE_KEY);
      if (stored) {
        return { ...defaultAdminState, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn("Unable to load admin state", error);
    }
    return { ...defaultAdminState };
  }

  function saveAdminState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(adminState));
    } catch (error) {
      console.warn("Unable to save admin state", error);
    }
  }

  function renderAdminState() {
    const message = adminState.announcement || "";
    if (maintenanceToggle) maintenanceToggle.checked = !!adminState.maintenance;
    if (announcementToggle)
      announcementToggle.checked = !!adminState.announcementEnabled;
    if (announcementMessage) announcementMessage.value = message;

    toggleMaintenanceBanner(adminState.maintenance);
    toggleAnnouncementBanner(adminState.announcementEnabled, message);
  }

  function toggleMaintenanceBanner(isActive) {
    if (!maintenanceBanner) return;
    maintenanceBanner.classList[isActive ? "remove" : "add"]("hidden");
  }

  function toggleAnnouncementBanner(isActive, message) {
    if (!announcementBanner || !announcementText) return;
    if (isActive && message.trim()) {
      announcementText.textContent = message.trim();
      announcementBanner.classList.remove("hidden");
    } else {
      announcementBanner.classList.add("hidden");
    }
  }
})();

/*==================== COPY ADDRESS BUTTON ====================*/
(function () {
  const copyButtons = document.querySelectorAll("[data-copy-value]");
  if (!copyButtons.length) return;

  function showFeedback(button) {
    button.classList.add("copied");
    setTimeout(() => button.classList.remove("copied"), 1500);
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }

  copyButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const value = button.getAttribute("data-copy-value");
      if (!value) return;
      try {
        await copyToClipboard(value);
        showFeedback(button);
      } catch (error) {
        console.warn("Unable to copy value", error);
      }
    });
  });
})();
