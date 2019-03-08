###管理端接口文档


#####  添加管理员
```http
    POST /api/register 
```
```json
    {
        "username": "",
        "password": "",
        "phone": "",
        "address":"",
        "role": ""
    }
```
##### 用户登录接口
```http
    POST /api/login 
```
```json
{
    "username": "",
    "password": ""
}
//响应的数据
{
  "type": 0,
  "message": "登录成功",
  "token":"",
  "selfInfo": {
    "id": 1,
    "password": "",
    "username": "",
    "phone": "",
    "address": "",
    "role": 2,
    "is_delete": 0,
    "create_time": ""
  },
  "role": 2
}


```
##### 获取个人信息
```http
    GET /api/getSelfInfo/:id
```
```json
{
  "type": 1,
  "selfInfo": {
    "id": 1,
    "password": "",
    "username": "",
    "phone": "",
    "address": "",
    "role": 2,
    "is_delete": 0,
    "create_time": ""
  }
}
```
##### 管理员修改自己的信息

```http
    put /api/putUser/:id
    { 
        username,
        password,
        phone,
        address,
        new_password:?
    }
```
```
{
  "type": 1,
  "message": "修改成功"
}
```
##### 获取全部管理员
```http
    GET /api/allAdmin/:role
```
```json
{
  "admins": [
    {
      "id": 1,
      "password": "202cb962ac59075b964b07152d234b70",
      "username": "admin@123",
      "phone": "15608790000",
      "address": "南开区",
      "role": 2,
      "is_delete": 0,
      "create_time": "1540390165394"
    }
  ],
  "amount": 3,
  "type": 1
}
```
##### 添加管理员 需要超级权限
```http
    POST /api/addUser
```
```json
{
    "address": "天津"
    "password": "123"
    "phone": "18990900909"
    "role": 1
    "username": "test1"
}
```
```
{
  "type": 1,
  "message": "注册成功!"
}
```
##### 删除管理员 需要超级权限
```http
    delete /delUser/:id
```
```
{
  "type": 1,
  "message": "删除成功"
}
```

##### 获取全部普通用户
```http
    GET /api/allUser
```
```json
{
  "admins": [
    {
      "id": 4,
      "password": "202cb962ac59075b964b07152d234b70",
      "username": "user1",
      "phone": "15609908778",
      "address": "天津",
      "role": 0,
      "is_delete": 0,
      "create_time": "1540393981676"
    }
  ],
  "amount": 1,
  "type": 1
}
```
##### 删除普通用户
```http
    delete /api/delUser/:id
```
```
{
  "type": 1,
  "message": "删除成功"
}
```

-----------
##### 添加宠物
```http
    post /api/addPet
```
```
{
    "name":"测试",
    "age":"2",
    "area":"天津",
    "pet_desc":"测试",
    "category_id":1,
    "breed":1,"image":"/images/logo_PC1540436130000.png"
}
```
```
{
  "type": 1,
  "message": "添加成功",
  "insertId": 4
}
```

##### 获取所有的宠物分类
```http
    GET /api/allPetCategory
```
```json
{
  "allPetCategory": [
    {
      "id": 1,
      "name": "宠物狗",
      "create_time": "1540390458000",
      "pet_breed": [
        {
          "id": 4,
          "cate_id": 1,
          "name": "英国斗牛犬",
          "create_time": "1540390790000"
        }
      ]
    }
  ],
  "type": 1
}
```
##### 删除宠物分类
```http
    delete /api/delPetCate/:id
```
```
{
  "message": "删除分类成功",
  "type": 1
}
```
##### 修改宠物分类
```http
    put /api/updatePetCate
```
```
{"id":6,"name":"测试2"}
```
```
{
  "message": "修改分类成功",
  "type": 1
}
```
##### 添加宠物分类
```http
    POST /api/addPetCate
```
```
{"name":"测试"}
```
```
{
  "message": "添加分类成功",
  "id": 6,
  "type": 1
}
```

##### 添加品种
```http
    POST /api/addBreed
```
```
cate_id: 5
name: "测试"
```
```
{
  "message": "添加品种成功",
  "id": 14,
  "type": 1
}
```

##### 删除品种
```http
    DELETE /api/delPetBreed/14
```
```
cate_id: 5
name: "测试"
```
```
{
  "message": "删除品种成功",
  "type": 1
}
```


##### 获取宠物列表
```http
    get /api/petList/:type
```
```json
{
  "type": 1,
  "petList": [
    {
      "id": 1,
      "name": "小可爱1",
      "image": "/images/dog11540392703000.jpg",
      "age": 1,
      "status": 0,
      "area": "天津",
      "category_id": 1,
      "pet_desc": null,
      "pet_breed": "4",
      "is_delete": 0,
      "create_time": "1540392730000",
      "category_name": "宠物狗"
    }
  ]
}
```

##### 删除宠物
```http
    delete /api/delPet/:id
```
```
{
  "type": 1,
  "message": "删除成功!"
}
```
##### 修改宠物信息
```http
    put /api/editPet
```
```
{
    "name":"测试",
    "age":"1",
    "area":"天津",
    "pet_desc":"测试1",
    "category_id":1,
    "breed":1,"image":"/images/logo_PC1540436130000.png",
    "id":4
}
```
```
{
  "type": 1,
  "message": "修改成功"
}
```

##### 获取所有的订单列表
```http
    put /api/petOrderList/:type
```
```json
{
  "applyForList": [
    {
      "id": 16,
      "user_id": 4,
      "pet_id": 2,
      "status": 0,
      "is_delete": 0,
      "create_time": "1540394143000",
      "username": "user1",
      "phone": "15609908778",
      "address": "天津",
      "pet_name": "可爱2",
      "pet_image": "/images/dog21540393479000.jpg"
    }
  ],
  "type": 0
}
```
##### 获取个人订单
```http
    put /api/getOrderByUserId/:id
```

```
{
    {
  "petList": [
    {
      "order_id": 23,
      "order_status": 0,
      "username": "user3",
      "id": 3,
      "name": "可爱3",
      "image": "/images/cat11540393702000.jpg",
      "age": 1,
      "status": 2,
      "area": "天津",
      "category_id": 2,
      "pet_desc": "特别乖",
      "pet_breed": "5",
      "is_delete": 0,
      "create_time": "1540393728000",
      "category_name": "宠物猫"
    }]
}
```
##### 删除申请
```http
    delete /api/delOrder/:id
```
```
{
  "type": 1,
  "message": "删除成功!"
}
```
##### 修改申请
```http
    put /api/updateOrder
```
```
{
    id: 16
    pet_id: 2
    status: 1
}
```
```
{
  "type": 1,
  "message": "修改成功"
}
```

--------------------

#### web 端接口 


#####  获取所有的宠物分类
```http
    get /api_web/allPetCategory
```

#####  获取所有的宠物
```http
    get /api_web/petList/:type
```
```
{
  "allPetCategory": [
    {
      "id": 1,
      "name": "宠物狗",
      "create_time": "1540390458000",
      "pet_breed": [
        {
          "id": 4,
          "cate_id": 1,
          "name": "英国斗牛犬",
          "create_time": "1540390790000"
        },
        {
          "id": 3,
          "cate_id": 1,
          "name": "柯基犬",
          "create_time": "1540390593000"
        },
        {
          "id": 2,
          "cate_id": 1,
          "name": "金毛犬",
          "create_time": "1540390560000"
        },
        {
          "id": 1,
          "cate_id": 1,
          "name": "拉布拉多犬",
          "create_time": "1540390534000"
        }
      ]
    }
  ],
  "type": 1
}
```
```
{
  "type": 1,
  "petList": [
    {
      "id": 1,
      "name": "小可爱1",
      "image": "/images/dog11540392703000.jpg",
      "age": 1,
      "status": 1,
      "area": "天津",
      "category_id": 1,
      "pet_desc": null,
      "pet_breed": "4",
      "is_delete": 0,
      "create_time": "1540392730000",
      "category_name": "宠物狗"
    }
  ]
}
```
#####  按名字搜索宠物
```http
    get /api_web/searchPet/:name
```
```
{
  "type": 1,
  "petList": [
    {
      "id": 1,
      "name": "小可爱1",
      "image": "/images/dog11540392703000.jpg",
      "age": 1,
      "status": 1,
      "area": "天津",
      "category_id": 1,
      "pet_desc": null,
      "pet_breed": "4",
      "is_delete": 0,
      "create_time": "1540392730000",
      "category_name": "宠物狗"
    }
  ]
}
```

##### 发起申请
```http
    post /api/applyForPet
```
```
{
    pet_id: 1
    user_id: 8
}
```
```
{
  "type": 1 | 0,
  "message": ""
}
```

##### 上传图片的接口
```http
    POST /api/upload 
```
```json
{
  "type": 1,
  "images_path": "/images/logo_PC1540436130000.png"
}
```
#####  注册用户
```http
    POST /api/register 
```
```json
    {
        "username": "",
        "password": "",
        "phone": "",
        "address":"",
        "role": ""
    }
```
##### 用户登录接口
```http
    POST /api/login 
```
```json
{
    "username": "",
    "password": ""
}
//响应的数据
{
  "type": 0,
  "message": "登录成功",
  "token":"",
  "selfInfo": {
    "id": 1,
    "password": "",
    "username": "",
    "phone": "",
    "address": "",
    "role": 2,
    "is_delete": 0,
    "create_time": ""
  },
  "role": 2
}


```
##### 获取个人信息
```http
    GET /api/getSelfInfo/:id
```
```json
{
  "type": 1,
  "selfInfo": {
    "id": 1,
    "password": "",
    "username": "",
    "phone": "",
    "address": "",
    "role": 2,
    "is_delete": 0,
    "create_time": ""
  }
}
```
##### 管理员修改自己的信息

```http
    put /api/putUser/:id
    { 
        username,
        password,
        phone,
        address,
        new_password:?
    }
```
```
{
  "type": 1,
  "message": "修改成功"
}
```