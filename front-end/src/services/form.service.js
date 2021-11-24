import store from "../store/store"
export default {
    sanitize: function(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match)=>(map[match]));
    },

    toBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    },

    async processAsset(info){
        let { file, type, title, description, sender, link, recepient, reviewDate } = info

        let encodedFile = ""
        if(file){
            encodedFile = await this.toBase64(file)
            
        }

        let token = store.getters.token

        let res = await fetch("http://localhost:3000/asset/",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        fileData: encodedFile,
                        type: type,
                        name: title,
                        description: description,
                        sender: sender,
                        assetLink: link,
                        recipients: recepient,
                        reviewDate: reviewDate
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                
            }
        )
            
        if(res.status === 201){
            return "Successful"
        }

        return "Failed to upload"
        
    },
    async processNotice(notice, token){

        let res = await fetch("http://localhost:3000/notice/",
            {
                method: "POST",
                body: JSON.stringify(notice),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                
            }
        )
            
        if(res.status === 201){
            return "Successful"
        }

        return "Failed to upload"
    }
}