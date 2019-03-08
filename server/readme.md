## 下载依赖 npm install

## 首先将 创建的数据参数配置在 config/mysql_config.js 里

## 在项目目录中 执行 node initTable.js 初始化 数据库中需要的数据表

## 开发环境中启动项目 node run dev


##管理端
#### 登录 权限校验
####    // 个人信息管理   put 
####    // 管理员管理  删 查
####    // 前台用户管理 删 查   审核
####    // 宠物信息管理
####        // 增删改查 上传图片
####        // 状态的 变更   发布中 -> 已选择领养人 -> 已领养
####    //宠物分类管理 增删改查 联动删除
####    // 领养订单处理 删 改 查 审核



##前台
### 登录 注册  post post
### 个人信息管理 put
### 首页展示 get 
### 筛选宠物信息 (地区、品种、年龄、关键字查询) get 
### 查看宠物详情 展示 报名 get post
### 报名领养 post 
### 查看订单列表 (订单状态: 已报名、已通过、已领养) get


### 表
###### 管理员信息
###### 用户信息 
###### 宠物信息 宠物种类 宠物 品种
###### 订单 订单状态
###### 


用户表 
    id 主键
    name
    password
    role {0: 普通, 1,管理员 ,2 超级管理员}
    is_delete {0: 未删除,1 已删除}
    create_time 创建时间
宠物表
    id 主键
    name 名字
    image 图片 代添加
    age 年龄
    area 所属地区
    category_id 所属分类
    desc 描述
    breed   品种
    create_at 创建时间
宠物种类表
    id 种类id
    name 种类名
    create_at 创建时间
宠物和种类中间表 pet_and_allcategory
    id 
    pet_id
    cate_id
订单表
    id
    user_id
    pet_id
    status 0 待审核 同意 1 未同意 2
    create_at 创建时间
