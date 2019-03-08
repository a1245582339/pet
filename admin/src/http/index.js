import  ajax  from './config'
const baseUrl = 'http://localhost:3000';

export const login = (data) => ajax({
    method: "post",
    url: `${baseUrl}/api/login`,
    data
})

export const checkoutPassword = (data) => ajax({
    method: "post",
    url: `/api/checkoutPassword`,
    data: {...data, type: 'admin'}
})

export const register = (data) => ajax({
    method: "post",
    url: `${baseUrl}/api/register`,
    data
})
export const getAllAdmin = (role) => ajax({
    method: "get",
    url: `${baseUrl}/api/allAdmin/${role}`,
})
export const delAdmin = (id) => ajax({
    method: "delete",
    url: `${baseUrl}/api/delUser/${id}`,
})
export const editAdmin = (data) => ajax({
    method: "put",
    url: `${baseUrl}/api/delUser`,
    data
})
export const getPetCategory = () => ajax({
    method: "get",
    url: `${baseUrl}/api/allPetCategory`,
})
export const addPetCategory = (data) => ajax({
    method: "post",
    url: `${baseUrl}/api/addPetCate`,
    data
})
export const addPetBreed = (data) => ajax({
    method: "post",
    url: `${baseUrl}/api/addBreed`,
    data
})
//delete('/delPetCate/:id'
export const delPetCategory = (id) => ajax({
    method: "delete",
    url: `${baseUrl}/api/delPetCate/${id}`,
})
export const delPetBreed = (id) => ajax({
    method: "delete",
    url: `${baseUrl}/api/delPetBreed/${id}`,
})
export const updatePetCategory = (data) => ajax({
    method: "put",
    url: `${baseUrl}/api/updatePetCate`,
    data
})

 
// 
export const getPetList = () => ajax({
    method: "get",
    url: `${baseUrl}/api/petList/all`,
})
export const getPetDetailById = (id) => ajax({
    method: "get",
    url: `${baseUrl}/api/getPetDetail/${id}`,
})
export const addPet = (data) => ajax({
    method: "post",
    url: `${baseUrl}/api/addPet`,
    data
})
export const delPet = (id) => ajax({
    method: "delete",
    url: `${baseUrl}/api/delPet/${id}`,
})
export const updatePet = (data) => ajax({
    method: "put",
    url: `${baseUrl}/api/editPet`,
    data
})


export const getSelfInfo = (id) => ajax({
    method: "get",
    url: `${baseUrl}/api/getSelfInfo/${id}/admin`,
})

export const updateSelfInfo = (id,data) => ajax({
    method: "put",
    url: `${baseUrl}/api/putUser/${id}`,
    data: {...data,type: 'admin'}
})
export const getPetOrderList = (type) => ajax({
    method: "get",
    url: `${baseUrl}/api/petOrderList/all`,
})
export const delOrder = (id) => ajax({
    method: "delete",
    url: `${baseUrl}/api/delOrder/${id}`,
})
export const updateApplyForById = (data /** 1: 同意, 2: 拒绝*/) => ajax({
    method: "put",
    url: `${baseUrl}/api/updateOrder`,
    data
})
export const addSliderImg = (data) => ajax({
    method: "post",
    url: `${baseUrl}/api/sliderImg`,
    data
})
export const sliderImgList = () => ajax({
    method: "get",
    url: `${baseUrl}/api/sliderImgList`,
})
export const delSliderImg = (id) => ajax({
    method: "delete",
    url: `${baseUrl}/api/sliderImg/${id}`,
})