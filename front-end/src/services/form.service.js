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

        let { file, type, title, description, sender, link, recepient } = info

        let encodedFile = ""
        if(file){
            encodedFile = this.toBase64(file)
        }

        let token = store.getters.token
        console.log(token)

        fetch("http://localhost:3000/asset/",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        file: encodedFile,
                        type: type,
                        title: title,
                        description: description,
                        sender: sender,
                        link: link,
                        recepient: recepient
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                
            }
        ).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            console.log("It worked!")
        })
    }
}