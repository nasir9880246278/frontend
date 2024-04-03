const express=require("express");
const router=express.Router();
const authcontroller=require("../contollers/auth-controller");
const authmiddleware = require("../middleware/auth-middleware");



router.route("/register").post(authcontroller.userregister);
router.route("/login").post(authcontroller.login)
router.route("/current").get(authmiddleware,authcontroller.current);
module.exports=router;