document.getElementById("registerForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/register", {

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

        alert(data.message);

        if (data.success) {
            window.location.href = "index.html";
        }

    } catch (err) {

        console.error(err);
        alert("Server Error");

    }

});