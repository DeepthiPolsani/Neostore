const express = require('express');
const router = express.Router();
const multer=require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const nodemailer = require("nodemailer");
const orderData = require('../models/orderSchema')

//select ddress
router.post('/selectaddress', (req, res) => {
    console.log(req.body)
    orderData.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.json({ err: 1, 'msg': "Unable to select Address" })
        }
        else {
            let selectaddr = req.body.selectaddr
            let addressData = { selectaddr: selectaddr }
            console.log(addressData)

            console.log(data)
            orderData.updateOne({ email: email }, { $set: { selectaddr: addressData } }, (err, data) => {
                if (err) {
                    res.json({ 'err': 1, "msg": "Address Not Added" })
                }
                else {
                    res.json({ "err": 0, "msg": "Address added successfully", user_details: data });
                    console.log(data.Address)
                }
            })
        }
    })
})

router.post("/carddetails", (req, res) => {
    let field = {
        Orderno: req.body.orderno,
        email: req.body.email,
        items: req.body.items,
        total: req.body.total,
    };
    console.log(field)
    let ins = new orderData({ ...field });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.json({"err":"Not added"});
        } else {
            res.json({ flag: 1, msg: "Details Added" });
        }

    });
});

router.post("/cardaddress", (req, res) => {

    let email = req.body.email;

    orderData.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
       
        if (err) res.json({ err: err });
        res.json({ msg: "ORDER PLACED" });
    })


});



//order data
router.get("/getorder/:email", (req, res) => {
    let email = req.params.email;
    orderData.find({ email: email }, (err, data) => {
        if (err) {
            throw err;
        }
        else{
        res.json({ user: data })
        }
       // console.log(data.items)
    })
})



//invoice
router.get("/pdf/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    orderData.find({ _id: id })
        .then((data,err) => {
            if (err) {
                throw err;
            }

            //console.log(data);
            else{
            res.json({ pdf: data,item:data.items})
            }
            //console.log(data.items)
         
        })

})


router.post("/sendmail", upload.single("file"), (req, res) => {
    
    console.log(req.file);
    let transporter = nodemailer.createTransport({
        service: "outlook",
        port: 587,
        secure: false,
        auth: {
          
           
            user: "polsanideepthi@outlook.com",
            pass: "Neostore@1",
        },
    });
    let mailOptions = {
        from: "raodeepthi71@gmail.com",
        to:"raodeepthi71@gmail.com",
        subject: "Invoice Details",
        text: "Invoice Details",
        attachments: [
            {
                filename: "invoice.pdf",
                content: req.file.buffer,
            },
        ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
module.exports = router