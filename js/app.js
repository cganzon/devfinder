const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");
const error = document.querySelector(".error");
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

function checkUserLocation(location) {
    if(location === null || location === "") {
        locationDisplay.classList.add("transparent", "disabled");
        locationDisplay.textContent = "Not Available";
    } else {
        locationDisplay.classList.remove("transparent", "disabled");
        locationDisplay.textContent = location;
    };
};

function checkUserBlog(blog) {
    if(blog === null || blog === "") {
        blogDisplay.classList.add("transparent", "disabled");
        blogDisplay.textContent = "Not Available";
    } else {
        blogDisplay.classList.remove("transparent", "disabled");
        blogDisplay.textContent = blog;
        blogDisplay.href = blog;
    };
};

function checkUserTwitter(twitter) {
    if(twitter === null || twitter === "") {
        twitterDisplay.classList.add("transparent", "disabled");
        twitterDisplay.textContent = "Not Available";
    } else {
        twitterDisplay.classList.remove("transparent", "disabled");
        twitterDisplay.textContent = twitter;
        twitterDisplay.href = `https://twitter.com/${twitter}`;
    };
};

function checkUserCompany(company) {
    if(company === null || company === "") {
        companyDisplay.classList.add("transparent", "disabled");
        companyDisplay.textContent = "Not Available";
    } else {
        companyDisplay.classList.remove("transparent", "disabled");
        companyDisplay.textContent = company;
        company = company.slice(1);
        companyDisplay.href = `https://github.com/${company}`;
    };
};

getUserData("octocat");