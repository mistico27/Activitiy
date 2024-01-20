import mongoose from 'mongoose';

const connection = async()=>{
    const databaseURL='mongodb+srv://crisfris27:EeiM4LQYg5BTka1q@cluster0.iwmzlp8.mongodb.net/Activities'
    mongoose.connect(databaseURL)
    .then(() => {
    console.log("we are connected to mongo jajaja!!!!");
    })
    .catch((err) => {
    console.log("We have an error, we could not connected to activity database", err);
    });
    
}

///exports
export default connection;