import  ajax  from './config'
export const login = (data) => ajax({
    method: "post",
    url: `/api/login`,
    data
})

export const checkoutPassword = (data) => ajax({
    method: "post",
    url: `/api/checkoutPassword`,
    data
})
export const register = (data) => ajax({
    method: "post",
    url: `/api/register`,
    data
})

export const getPetCategory = () => ajax({
    method: "get",
    url: `/api_web/allPetCategory`,
})

export const sliderImgList = () => ajax({
    method: "get",
    url: `/api_web/sliderImgList`,
})
export const getPetList = (category_id,breed_id) => ajax({
    method: "get",
    url: `/api_web/petList/${category_id}/${breed_id}`,
})
export const searchPet = (name) => ajax({
    method: "get",
    url: `/api_web/searchPet/${name}`,
})

export const getSelfInfo = (id) => ajax({
    method: "get",
    url: `/api/getSelfInfo/${id}/user`,
})
export const updateSelfInfo = (id,data) => ajax({
    method: "put",
    url: `/api/putUser/${id}`,
    data
})
export const getPetOrderList = (type) => ajax({
    method: "get",
    url: `/api/petOrderList/all`,
})
export const delOrder = (id) => ajax({
    method: "delete",
    url: `/api/delOrder/${id}`,
})
export const updateApplyForById = (data /** 1: 同意, 2: 拒绝*/) => ajax({
    method: "put",
    url: `/api/updateOrder`,
    data
})
export const applyForPet = (data) => ajax({
    method: "post",
    url: `/api/applyForPet`,
    data
})
export const getOrderByUserId = (id) => ajax({
    method: "get",
    url: `/api/getOrderByUserId/${id}`,
})
