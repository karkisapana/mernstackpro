import express, { Router } from "express"
import {
    registerController, 
    loginController, 
    testController,
    forgotPasswordController, 
    
} from '../controller/authController.js';

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router()

//routing
//Registor(method post)

router.post('/register',registerController);

//LOGIN || post request
router.post('/login', loginController);

//forget password
router.post('/forgot-password', forgotPasswordController)


//Test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected user-route auth
// router.get("/user-auth", requireSignIn, (req, res) => {
//     res.status(200).send ({ ok: true});
// })

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });


//protected admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send ({ ok: true});
})


export default router;