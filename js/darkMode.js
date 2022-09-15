let darkMode = localStorage.getItem("dark-mode");
const themeToggleBtn = document.querySelector(".theme-toggle-button");
const moonIcon = document.querySelector("#moon");
const sunIcon = document.querySelector("#sun");

if(darkMode === "enabled") {
    enableDarkMode();
} else {
    disableDarkMode();
};

themeToggleBtn.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if(darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    };
});

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
    moonIcon.classList.remove("show");
    sunIcon.classList.add("show");
};

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", null);
    moonIcon.classList.add("show");
    sunIcon.classList.remove("show");
};