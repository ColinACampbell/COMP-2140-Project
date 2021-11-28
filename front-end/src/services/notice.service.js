export default {
    getNotices(token){
        let res = await fetch("http://localhost:3000/notices/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            
        })
        console.log(res.status)
        if(res.status === 200){
            return await res.json()
        }
        return "Failed to fetch"
           
    }, 
    async uploadNoticeChanges(token, id, info){
    
        let res = await fetch(`http://localhost:3000/notice/${id}`,
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
    }
}