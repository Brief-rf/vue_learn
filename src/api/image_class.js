import axios from '~/axios'


export function getImageClassList(page, limit=10){
    return axios.get(`/admin/image_class/${page}?limit=`+limit)
}

export function createImageClass(data){
    return axios.post("/admin/image_class", data)
}

export function udpateImageClass(id, data){
    return axios.post("/admin/image_class/"+id, data)
}

export function deleteImageCLass(id){
    // return axios.post("/admin/image_class/"+id+"/delete")
    return axios.post(`/admin/image_class/${id}/delete`)
}
