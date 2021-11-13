// services are used to make http requests

export default {
    login (info) {
        // fetch post request
        const { email, password } = info;
        fetch("http://localhost:3000/user/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                
            }
        ).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }, 

    signup (info) {
        // fetch post request
        
        fetch("http://localhost:3000/user/",
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(info)
            }
        ).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }, 



}