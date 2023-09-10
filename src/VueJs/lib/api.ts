import axios from "axios";

export async function addContent(url: string, key: string, content: string) {
    return await axios.post(url + '/api/Content/Add',{
        key: key,
        content: content
    },{
        withCredentials: true
    })
}

export async function getContent(url:string,key : string){
    return await axios.get(url + '/api/Content/GetContentByKey',{
        params:{
            key: key
        },
        withCredentials: true
    })
}
