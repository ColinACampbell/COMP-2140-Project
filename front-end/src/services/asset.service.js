export default {
    toBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    },

    capitaliseFirstLetter(str){
        return str.replace(/(^|\s)\S/g, letter => letter.toUpperCase())
    },

    async getAssets(token){
        let res = await fetch("http://localhost:3000/asset/",
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

    async getAsset(token, id){
        // console.log(id, "ID")
        let res = await fetch(`http://localhost:3000/asset/${id}`,
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

    async uplaodChanges(token, id, info){
        let { file } = info

        let encodedFile = ""
        if(file){
            encodedFile = await this.toBase64(file)
            
        }

        info.file = encodedFile

        let res = await fetch(`http://localhost:3000/asset/`,
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