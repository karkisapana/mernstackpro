import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from '../models/userModel.js';
import Jwt  from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
        const {name, email, password, address, answer, phone} = req.body;

        //validation
        if(!name){
            return res.send({message:'Name is Required'})
        }

        if(!email){
            return res.send({message:'Email is Required'})
        }

        if(!password){
            return res.send({message:'Password is Required'})
        }

        if(!address){
            return res.send({message:'address is Required'})
        }

        if(!answer){
            return res.send({message:'answer is Required'})
        }

        if(!phone){
            return res.send({message:'phone is Required'})
        }




        //check user
        const exisitingUser = await userModel.findOne({email})
        //existing user

        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'already registor please login',
            })
        }
        //Registor user
        const hashedPassword = await hashPassword(password)


        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
            answer
        }).save()

            res.status(201).send({
                success:true,
                message:'user regstor successfully',
                user
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in registration',
            err
        })
        
    }
};

//post login
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }


        //check user
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }

        //token
        const token = await Jwt.sign({_id: user._id},process.env.JWT_SECRET, {expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,


            },
            token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
        
    }
};

//forgrt password
// export const forgetPasswordController = async(req, res) => {
//     try {
//         const { email, answer, newPassword} = req.body
//         if(!email)
//         {
//             res.status(400).send({message:'Email is require'})

//         }

//         if(!answer)
//         {
//             res.status(400).send({message:'answer  is require'})
            
//         }

//         if(!newPassword)
//         {
//             res.status(400).send({message:'newPassword is require'})
            
//         }
//             //check

//             const user = await userModel.findOne({ email, answer})

//             //validation

//             if(!user){
//                 return res.status(404).send({
//                     success:false,
//                     message: 'Wrong email or answer'
//                 })
//             }
//         const hashed = await hashPassword(newPassword)
//         await userModel.findByIdAndUpdate(user._id, {password: hashed});
//         res.status(200).send({
//             success:true,
//             message:'Password Reset Successfully',
//         })
            

//     } catch (error) {
//         console.log(error) 
//         res. status(500).send({
//             success:false,
//             message:'something went wrong',
//             error
        
//         })

        
//     }
// }





export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };



//test controller
export const testController = (req, res) => {
    res.send('protection routes');
}