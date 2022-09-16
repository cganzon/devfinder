const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value.trim();
    getUserData(usernameValue);
});

function getUserData(username) {
    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
        if(data.message === "Not Found") {
            console.log("No results");
        } else {
            console.log(data);
            displayUserData(data);
        };
    });
};

function displayUserData(user) {
    const userName = document.querySelector(".user-name");
    const userLogin = document.querySelector(".user-login");
    const userAvatar = document.querySelector(".user-avatar");

    userName.textContent = user.name;
    userLogin.textContent = `@${user.login}`;
    userAvatar.src = user.avatar_url;
};

(function firstLoad() {
    getUserData("octocat");
})();