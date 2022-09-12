fetch("https://api.github.com/users/octocat")
    .then(res => res.json())
    .then(data => console.log(data));