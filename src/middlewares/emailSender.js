import nodemailer from 'nodemailer';

const verifyEmail = async(email,link)=>{
    try{
        let transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:"------------",
                pass:"------------",
            }
        });
        ///send email
        let info= await transporter.sendMail({
            from:"----------",
            to:email,
            subject:"Account verification",
            text:"Welcome amigo!!!",
            html:`<div>
            <a href=${link}>click here</a>
            </div>`
        });
        console.log("mail send successfully")
    }catch(error){
        console.log(error,'email failed to send');
    }
}

export default verifyEmail;