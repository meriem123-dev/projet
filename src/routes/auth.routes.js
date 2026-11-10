const express = require('express');
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register',controller.registerController);
router.post('/login',controller.loginController);
router.get('/me',authMiddleware.authenticate,controller.meController);


module.exports= router;