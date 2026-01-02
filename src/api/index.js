import axios from '~/axios'

export function getStatistics1(username, password){
    return axios.get("/admin/statistics1", {
        username, password
    })
}
