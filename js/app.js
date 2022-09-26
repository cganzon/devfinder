const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");
const error = document.querySelector(".error");
const userName = document.querySelector(".user-name");
const userLogin = document.querySelector(".user-login");
const joinDate = document.querySelector(".joined");
const userAvatar = document.querySelector(".user-avatar");
const bioDisplay = document.querySelector(".bio");
const reposNum = document.querySelector(".repos-num");
const followersNum = document.querySelector(".followers-num");
const followingNum = document.querySelector(".following-num");
const locationDisplay = document.querySelector(".location")
const blogDisplay = document.querySelector(".blog");
const twitterDisplay = document.querySelector(".twitter");
const companyDisplay = document.querySelector(".company");
const locationIcon = document.querySelector(".location-icon");
const blogIcon = document.querySelector(".blog-icon");
const twitterIcon = document.querySelector(".twitter-icon");
const companyIcon = document.querySelector(".company-icon");

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
    checkUserName(user.name, user.login);
    userLogin.textContent = `@${user.login}`;
    joinDate.textContent = `Joined ${convertDate(user.created_at)}`;
    userAvatar.src = user.avatar_url;
    userAvatar.setAttribute("alt", `Profile picture of ${user.login}`);
    checkUserBio(user.bio);
    reposNum.textContent = user.public_repos;
    followersNum.textContent = user.followers;
    followingNum.textContent = user.following;
    checkUserLocation(user.location);
    checkUserBlog(user.blog);
    checkUserTwitter(user.twitter_username);
    checkUserCompany(user.company);
};

function convertDate(datetime) {
    const date = new Date(datetime);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

function checkUserName(username, login) {
    if(username === null) {
        userName.textContent = login;
    } else {
        userName.textContent = username;
    };
};

function checkUserBio(bio) {
    if(bio === null) {
        bioDisplay.textContent = "This profile has no bio.";
        bioDisplay.classList.add("transparent");
    } else {
        bioDisplay.textContent = bio;
        bioDisplay.classList.remove("transparent");
    };
};

function checkUserLocation(location) {
    if(location === null || location === "") {
        locationDisplay.classList.add("transparent", "disabled");
        locationDisplay.textContent = "Not Available";
        locationIcon.classList.add("transparent");
    } else {
        locationDisplay.classList.remove("transparent", "disabled");
        locationDisplay.textContent = location;
        locationIcon.classList.remove("transparent");

    };
};

function checkUserBlog(blog) {
    if(blog === null || blog === "") {
        blogDisplay.classList.add("transparent", "disabled");
        blogDisplay.textContent = "Not Available";
        blogIcon.classList.add("transparent");
    } else {
        blogDisplay.classList.remove("transparent", "disabled");
        blogDisplay.textContent = blog;
        blogDisplay.href = blog;
        blogIcon.classList.remove("transparent");
    };
};

function checkUserTwitter(twitter) {
    if(twitter === null || twitter === "") {
        twitterDisplay.classList.add("transparent", "disabled");
        twitterDisplay.textContent = "Not Available";
        twitterIcon.classList.add("transparent");
    } else {
        twitterDisplay.classList.remove("transparent", "disabled");
        twitterDisplay.textContent = twitter;
        twitterDisplay.href = `https://twitter.com/${twitter}`;
        twitterIcon.classList.remove("transparent");
    };
};

function checkUserCompany(company) {
    if(company === null || company === "") {
        companyDisplay.classList.add("transparent", "disabled");
        companyDisplay.textContent = "Not Available";
        companyIcon.classList.add("transparent");
    } else {
        companyDisplay.classList.remove("transparent", "disabled");
        companyDisplay.textContent = company;
        company = company.slice(1);
        companyDisplay.href = `https://github.com/${company}`;
        companyIcon.classList.remove("transparent");
    };
};

getUserData("octocat");