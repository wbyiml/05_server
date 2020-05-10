const model = require('../infrastructure/model');

function getAllUsers() {
    return new Promise(function(resolve,reject){
        let User = model.user;
        User.findAndCountAll({  //count  findAll  findOne
            order: ['id'],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function getUserById(user_id) {
    return new Promise(function(resolve,reject){
        let User = model.user;
        User.findAll({  //count  findAll  findOne
            where: {
                id: user_id
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function getAllUserRoles() {
    return new Promise(function(resolve,reject){
        let User_role = model.user_role;
        User_role.findAndCountAll({  //count  findAll  findOne
            order: ['user_id'],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};


function insertUser(phone) {
    return new Promise(function(resolve,reject){
        let User = model.user;
        User.create({
            phone: phone,
            experience: 0
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


//注册后设置用户基本信息 controller user.js
function updateUser(user) {
    return new Promise(function(resolve,reject){
        let User = model.user;
        User.update({
            name: user.name,
            sex: user.sex,
            birthday: user.birthday,
            phone: user.phone,
            email: user.email,
            identity: user.identity,
            student_number: user.student_number,
            shcool_id: user.shcool_id,
            faculty_id: user.faculty_id,
            major_id: user.major_id,
            user_name: user.user_name,
            head_image: user.head_image,
            experience: user.experience,
            extend_json: user.extend_json,
        },{
            where:{
                id: user.id
            }
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

function updateAllUserRole(pairs) {
    return new Promise(function(resolve,reject){
        let User_role = model.user_role;
        User_role.destroy({ 
            where: {}, 
            truncate: true 
        })
        .then(function(result) {
            return User_role.bulkCreate(pairs) //user_id  role_id  role_name
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


//用户设置头像等信息 手机 邮箱（不同于login的手机邮箱）

module.exports = {
    'getAllUsers': getAllUsers,
    'getUserById': getUserById,
    'getAllUserRoles': getAllUserRoles,
    'insertUser': insertUser,
    'updateUser': updateUser,
    'updateAllUserRole': updateAllUserRole,
};