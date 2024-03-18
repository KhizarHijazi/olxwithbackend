import express from "express";
import users from '../modules/userSchema.js'
import path from 'path';


const router = express.Router()
// const signupFormPath = path.join(__dirname , '../../front-end/src/views/Auth/register.js')

// router.get('/' , (req , res)=>{

//     res.sendFile(signupFormPath);
// })
router.post('/signup', async (req, res) => {

    const { fullname, email, password } = req.body
    try {
        const user = await users.create({ fullname, email, password })
        await user.save()
        console.log(user)
        res.status(200).send({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).send({ message: "Failed to register user", error: error.message });
    }
})

router.put('/login', async (req, res) => {
    try {
        // step 1 :  email exists 
        const { email, password } = req.body
        const user = await users.findOne({ email , password })
        if (!user) {
            res.send({ message: 'user not found plz first signup' })

        }
        // step 1 :  password encryption 
        // step 1 :  jwt token 


        res.send({ message: 'user logged in successfully' })
    } catch (error) {

        res.status(500).send(error.message)
    }

})
export default router