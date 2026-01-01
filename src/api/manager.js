import axios from '~/axios'

export function login(username, password){
    return axios.post("/admin/login", {
        username, password
    })
}
export function logout(){
    return axios.post("/admin/logout")
}

export function getInfo(){
    return axios.post("/admin/getinfo")
}

export function updatepassword(oldpassword, password, repassword){
    return axios.post("/admin/updatepassword", {oldpassword, password, repassword})
}