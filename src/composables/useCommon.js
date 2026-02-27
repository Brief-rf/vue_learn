
import {ref, reactive, computed} from 'vue'
export function useInitTable(obj) {
    let searchForm = null
    let resetSearchForm = null
    if(obj.searchForm){
        searchForm = reactive({...obj.searchForm})
        resetSearchForm = ()=>{
            for(const key in obj.searchForm){
                searchForm[key] = obj.searchForm[key]
            }
            getData()
        }
    }



    // const searchForm = reactive({
    //     keyword: ""
    // })
    // const resetSearchForm = () => {
    //     searchForm.keyword = ""
    //     getData()
    // }
    const tableData = ref([])
    const loading = ref(false)
    // 分页
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)
    const roles = ref([])


    function getData(p = null) {
        if (typeof p == "number") {
            currentPage.value = p
        }
        loading.value = true

        obj.getList(currentPage.value, searchForm).then(res => {
            
            if(obj.onGetListSuccess && typeof obj.onGetListSuccess == "function"){
                obj.onGetListSuccess(res)
            }else {
                
                tableData.value = res.list
                total.value = res.totalCount
            }
            
        }).finally(() => {
            loading.value = false
        })
    }
    getData()
    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData
    }
}