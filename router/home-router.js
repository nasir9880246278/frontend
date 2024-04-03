const express=require("express");
const router=express.Router();
const controller=require("../contollers/contact-contoller");
const authmiddleware = require("../middleware/auth-middleware");

router.route("/").get(authmiddleware,controller.getcontacts);

router.route("/").post(authmiddleware,controller.createcontact);

router.route("/:id").get(authmiddleware,controller.getsinglecontact);

router.route("/:id").put(authmiddleware,controller.updatecontact);

router.route("/:id").delete(authmiddleware,controller.deletecontact);
            

module.exports=router;