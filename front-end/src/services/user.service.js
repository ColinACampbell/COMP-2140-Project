// services are used to make http requests

export default {
    async login (info) {
        // fetch post request
        const { email, password } = info;
        const res = await fetch(
            "http://localhost:8000/login",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
            }
        );
        const data = await res.json();
        console.log(data.status);
    }, 

    async signup (info) {
        // fetch post request
        const { name, position, email, password } = info;
        console.log(info)
        const res = await fetch(
            "http://localhost:8000/signup",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                position,
                email,
                password,
            })
            }
        );
        const data = await res.json();
        console.log(data.status);
    }, 



}