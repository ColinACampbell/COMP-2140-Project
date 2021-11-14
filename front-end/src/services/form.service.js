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

    processAsset(info, file){
        let assetData = new FormData()
        assetData.append('asset', file)
        assetData.append('info', JSON.stringify(info))

        fetch("http://localhost:3000/asset/create",
            {
                method: "POST",
                body: assetData,
                headers: {
                    "Content-Type": "application/json"
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