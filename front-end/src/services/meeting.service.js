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

    async uploadAlertChanges(token, id, info){
    
        let res = await fetch(`http://localhost:3000/meeting-alert/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            
        })
        if(res.status === 200){
            return await res.json()
        }
        return "Failed to update"
    },

    // async deleteAlert(token, id){
    //     let res = await fetch(`http://localhost:3000/meeting-alert/delete/${id}`,
    //     {
    //         method: "DELETE",
    //         headers: {
    //             "Authorization": "Bearer " + token,
    //         },
            
    //     })
    //     if(res.status === 200){
    //         return "Successful"
    //     }
    //     return "Failed to update"
    // }
}