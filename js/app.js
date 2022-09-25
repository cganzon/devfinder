const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");
const userName = document.querySelector(".user-name");
const userLogin = document.querySelector(".user-login");
const joinDate = document.querySelector(".joined");
const userAvatar = document.querySelector(".user-avatar");
const bio = document.querySelector(".bio");
const reposNum = document.querySelector(".repos-num");
const followersNum = document.querySelector(".followers-num");
const followingNum = document.querySelector(".following-num");
const locationDisplay = document.querySelector(".location")
const blog = document.querySelector(".blog");
const twitter = document.querySelector(".twitter");
const company = document.querySelector(".company");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value.trim();
    getUserData(usernameValue);
});

function getUserData(username) {
    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
        const error = document.querySelector(".error");
        if(data.message === "Not Found") {
            error.classList.add("show");
        } else {
            console.log(data);
            error.classList.remove("show");
            displayUserData(data);
            usernameInput.value = "";
        };
    });
};

function displayUserData(user) {
    if(user.name === null) {
        userName.textContent = user.login;
    } else {
        userName.textContent = user.name;
    };
    userLogin.textContent = `@${user.login}`;
    joinDate.textContent = `Joined ${convertDate(user.created_at)}`;
    userAvatar.src = user.avatar_url;
    userAvatar.setAttribute("alt", `Profile picture of ${user.login}`);
    if(user.bio === null) {
        bio.textContent = "This profile has no bio.";
        bio.classList.add("transparent");
    } else {
        bio.textContent = user.bio;
        bio.classList.remove("transparent");
    };
    reposNum.textContent = user.public_repos;
    followersNum.textContent = user.followers;
    followingNum.textContent = user.following;

    if(user.location === null) {
        locationDisplay.textContent = "Not Available";
        locationDisplay.classList.add("transparent");
    } else {
        locationDisplay.textContent = user.location;
        locationDisplay.classList.remove("transparent");
    };
    if(user.blog === null) {
        blog.textContent = "Not Available";
        blog.classList.add("transparent");
    } else {
        blog.textContent = user.blog;
        blog.classList.remove("transparent");
    };
    if(user.twitter_username === null) {
        twitter.textContent = "Not Available";
        twitter.classList.add("transparent");
    } else {
        twitter.textContent = user.twitter_username;
        twitter.classList.remove("transparent");
    };
    if(user.company === null) {
        company.textContent = "Not Available";
        company.classList.add("transparent");
    } else {
        company.textContent = user.company;
        company.classList.remove("transparent");
    };
};

function convertDate(datetime) {
    const date = new Date(datetime);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

getUserData("octocat");