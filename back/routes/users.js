const express=require('express')

var router=express.Router()

const{authAdmin}=require('../middlewares/authAdmin')

const {auth}=require('../middlewares/auth')

const {getAllUsers,addUser,getOneUser,updateUser,deleteUser,login,posts4specificUser,toggleUserStatus,fetchLikedPosts}=require('../controllers/users')




router.get('/',getAllUsers)


router.post('/signup',addUser)


router.get('/:id',getOneUser)


router.patch('/editprofile/:id',updateUser)


router.delete('/:id',auth,authAdmin,deleteUser)


router.get('/:id/posts',posts4specificUser)



router.get('/:userId/liked-posts',fetchLikedPosts);

router.put('/:id/toggle-status' ,toggleUserStatus)

//authentication
router.post('/login',login)

module.exports=router