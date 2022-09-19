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
    const joinDate = document.querySelector(".joined");
    const userAvatar = document.querySelector(".user-avatar");
    const reposNum = document.querySelector(".repos-num");
    const followersNum = document.querySelector(".followers-num");
    const followingNum = document.querySelector(".following-num");

    userName.textContent = user.name;
    userLogin.textContent = `@${user.login}`;
    joinDate.textContent = `Joined ${convertDate(user.created_at)}`;
    userAvatar.src = user.avatar_url;
    userAvatar.setAttribute("alt", `Profile picture of ${user.login}`);

    reposNum.textContent = user.public_repos;
    followersNum.textContent = user.followers;
    followingNum.textContent = user.following;
};

function convertDate(datetime) {
    const date = new Date(datetime);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

getUserData("octocat");