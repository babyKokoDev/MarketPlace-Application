const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const connectDb = require('./dB/connect')
const port = process.env.PORT || 5000
const userRoute = require('./routes/userRoute')
const productsRoute = require('./routes/productsRoute')
const bidsRoute = require('./routes/bidsRoute')
const notificationsRoute = require('./routes/notificationRoute')



app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/products', productsRoute)
app.use('/api/bids', bidsRoute)
app.use('/api/notifications', notificationsRoute)




const start = async () => {
    try {
         await connectDb(process.env.MONGO_URI)
         app.listen(port, ()=>{
            console.log(`Server is working and listening on port ${port}`);
        })
    } catch (error) {
          console.log(error)   
    }
}

start()