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
const blogDisplay = document.querySelector(".blog");
const twitterDisplay = document.querySelector(".twitter");
const companyDisplay = document.querySelector(".company");

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
        blogDisplay.textContent = "Not Available";
        blogDisplay.classList.add("transparent");
    } else {
        blogDisplay.textContent = user.blog;
        blogDisplay.classList.remove("transparent");
    };
    if(user.twitter_username === null) {
        twitterDisplay.textContent = "Not Available";
        twitterDisplay.classList.add("transparent");
    } else {
        twitterDisplay.textContent = user.twitter_username;
        twitterDisplay.classList.remove("transparent");
    };
    if(user.company === null) {
        companyDisplay.textContent = "Not Available";
        companyDisplay.classList.add("transparent");
    } else {
        companyDisplay.textContent = user.company;
        companyDisplay.classList.remove("transparent");
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