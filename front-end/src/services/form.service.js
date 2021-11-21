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

    processAsset(info){

        let { file, type, title, description, sender, link, recepient, reviewDate } = info

        let encodedFile = ""
        if(file){
            encodedFile = this.toBase64(file)
        }

        let token = store.getters.token

        fetch("http://localhost:3000/asset/",
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
                        recepients: recepient,
                        reviewDate: reviewDate
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                
            }
        ).then(res => {
            if(res.status === 201){
                return "Successful"
            }
            return "Failed to upload"
        }).then(data => {
            return data
        })
    }
}