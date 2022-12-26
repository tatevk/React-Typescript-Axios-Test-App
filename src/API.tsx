
import axios from 'axios'

const getConfig : Params = {
    baseUrl: "https://randomuser.me/api",
    headers: {

    },
    method: 'get'
}
const postConfig: Params = {
    baseUrl: "https://acc-test-vjn7.onrender.com/form",
    headers: {
        "content-type": 'application/json',
        "x-api-key": 'letmein',
    },
    method: 'post'
}

interface Params {
    baseUrl: string
    headers : any
    method: string
}

export const getAPI = async (url: string): Promise<any> =>{
    return await axios({
        ...getConfig,
        url: `${url}`,
    }).then ( (response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
}

export  const postAPI = async (url: string, data: any): Promise<any> =>{
    return await axios({
        ...postConfig,
        url: `${url}`,
        data
    }).then ( (response) => {
        console.log('response11', response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{

        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })

}