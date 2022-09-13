const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");

fetch("https://api.github.com/users/octocat")
    .then(res => res.json())
    .then(data => console.log(data));