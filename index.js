const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ltjdg3f.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    try{

         const productCollection = client.db('ProductCollection').collection('Products');
         const orderCollection = client.db('ProductCollection').collection('orders');

         app.post('/addproduct', async(req, res) =>{
             const product = req.body;
             console.log(product); 
             const result = await productCollection.insertOne(product);
             res.send(result);
         });


         app.post('/orderconfirm', async(req, res) =>{
            const order = req.body;
            console.log(order); 
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

         app.get('/hp', async(req, res)=>{
            //const query = {};
            const query = {
                catagory:'HP',
            };
            const cursor = productCollection.find(query);
            const hpProducts = await cursor.toArray();
            res.send(hpProducts);

       });
       app.get('/dell', async(req, res)=>{
        //const query = {};
        const query = {
            catagory:'Dell',
        };
        const cursor = productCollection.find(query);
        const hpProducts = await cursor.toArray();
        res.send(hpProducts);

   });
   app.get('/acer', async(req, res)=>{
    //const query = {};
    const query = {
        catagory:'Acer',
    };
    const cursor = productCollection.find(query);
    const hpProducts = await cursor.toArray();
    res.send(hpProducts);

});

app.get('/booking/:id', async(req, res) =>{
    const id = req.params.id;
    const query = { _id: ObjectId(id)}
    const result = await productCollection.findOne(query);
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
