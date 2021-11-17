// services are used to make http requests

export default {
    async login (info) {
        // fetch post request
        const { email, password } = info;
        let res =  await fetch("http://localhost:3000/user/authenticate",
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                
            })

        let data = await res.json()
        console.log(data)
        if(data.message){
            return "Invalid login"
        }else{
            // let userToken = {'token': data.token, 'user': data.user}
            localStorage.setItem("login-token", JSON.stringify(data))
            return "Successful"
        }
       
    }, 

    async signup (info) {
        // fetch post request
        let res = await fetch("http://localhost:3000/user/",
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(info)
            }
        )
        let data = res.json()
        
        return data
    }, 
}