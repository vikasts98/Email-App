/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);*/

import express from 'express';
import { json, urlencoded } from 'body-parser';
import { createTransport } from 'nodemailer';
import cors from 'cors';
const app = express();
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());
app.get('/',()=>{
  window.resizeBy.send('Welcome to my email-app')
})

app.post('/api/email',(req,res)=>{
    let data = req.body
    let smtpTranport = createTransport({
      service : 'Gmail',
      port : 465,
      auth : {
        user :'',
        pass:''
      }
    });
    let mailOptions={
      from:data.email,
      to:'',
      subject:'Message from ${KLR}',
      html:`
      <h3>Information</h3>
      <ul>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>Message: ${data.message}</li>
      </ul>`
    };
    smtpTranport.sendMail(mailOptions,(error,response)=>{
      if(error){
        res.send(error)
      }
      else{
        res.send('Success')
      }
    })
    smtpTranport.close();
})

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
  console.log('server starting at port ${PORT}');
})