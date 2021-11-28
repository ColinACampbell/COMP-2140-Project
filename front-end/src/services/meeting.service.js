export default{
    async getMeetingAlerts(token){
        let res = await fetch("http://localhost:3000/meeting-alert/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            
        })
        if(res.status === 200){
            return await res.json()
        }
        return "Failed to fetch"
       
    },
}