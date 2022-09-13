const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value.trim();
    console.log(usernameValue);
});

fetch("https://api.github.com/users/octocat")
    .then(res => res.json())
    .then(data => console.log(data));