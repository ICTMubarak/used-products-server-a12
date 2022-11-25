const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;


const express = require('express');


//middleware
app.use(cors());
app.use(express.json());


//user: user6
//pass: PD6C7m8trWXK1XfT




const uri = "mongodb+srv://user6:PD6C7m8trWXK1XfT@cluster0.ltjdg3f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

    try{

         const serviceCollection = client.db('ServiceCollection').collection('services');
         const reviewCollection = client.db('ServiceCollection').collection('reviews');
  

         app.post('/addproduct', async(req, res) =>{
             const service = req.body;
             console.log(service); 
             const result = await serviceCollection.insertOne(service);
             res.send(result);
         })

    }

    finally{

    }

}

run().catch(err => console.log(err));


app.get('/',(req, res)=>{
    res.send('Used Laptop  server is running')
});



app.listen(port, ()=>{
    console.log(`Used Laptop server running in port=${port}`);
})
