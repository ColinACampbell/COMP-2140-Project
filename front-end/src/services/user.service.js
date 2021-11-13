// services are used to make http requests

export default {
    async login (info) {
        // fetch post request
        const { email, password } = info;
        const res = await fetch(
            "http://localhost:3000/user/login",
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
        console.log(info)
        const res = await fetch(
            "http://localhost:3000/user/",
            {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }
        );
        const data = await res.json();
        console.log(data.status);
    }, 



}