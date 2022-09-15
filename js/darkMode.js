let darkMode = localStorage.getItem("dark-mode");
const themeToggleBtn = document.querySelector(".theme-toggle-button");

if(darkMode === "enabled") {
    enableDarkMode();
} else {
    disableDarkMode();
}

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
};

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", null);
};