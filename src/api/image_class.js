import axios from '~/axios'


export function getImageClassList(page, limit=10){
    return axios.get(`/admin/image_class/${page}?limit=`+limit)
}
