const express = require('express');
const app =express();
const port =5000;



app.get('/',(req, res)=>{
    res.send('Used Laptop  server is running')
});



app.listen(port, ()=>{
    console.log(`Used Laptop server running in port=${port}`);
})
