const Quote = require("../models/Quote");

const transporter =
require("../config/mailer");

exports.createQuote = async (req,res)=>{

    try{

        const {
            name,
            phone,
            message
        } = req.body;

        // MongoDB Save
        await Quote.create({
            name,
            phone,
            message
        });

        // Owner Email
        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:process.env.OWNER_EMAIL,

            subject:"New Quote Request",

            html:`
                <h2>New Customer Inquiry</h2>

                <p>
                <strong>Name:</strong>
                ${name}
                </p>

                <p>
                <strong>Phone:</strong>
                ${phone}
                </p>

                <p>
                <strong>Message:</strong>
                ${message}
                </p>
            `
        });

        res.json({
            success:true,
            message:"Quote Submitted Successfully"
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};