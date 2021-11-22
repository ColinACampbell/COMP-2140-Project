export default {
    getAssets(token){
        fetch("http://localhost:3000/asset/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            
        }).then(res => {
            if(res.status === 201){
                return "Successful"
            }
            return "Failed to upload"
        }).then(data => {
            return data
        })
    }
}