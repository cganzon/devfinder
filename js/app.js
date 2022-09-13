const usernameInput = document.querySelector(".username");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value.trim();
    
    fetch(`https://api.github.com/users/${usernameValue}`)
    .then(res => res.json())
    .then(data => console.log(data));
});