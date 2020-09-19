    async function HttpGet(url){
        const resp =  await fetch(url,{
            method: 'GET',
        });
        return resp;
    }
    
    async function HttpPost(data,url){
        
        const resp =  await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return resp;
    }

    async function HttpDelete(data,url){
        
        const resp =  await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return resp;
    }


    export {HttpGet, HttpPost, HttpDelete}