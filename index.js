import express from "express"
import fs from 'fs'
import {format} from "date-fns";
import path from "path";

// importing phase

// declaration phase
const app = express();
const PORT = 4000;

// middleware

app.use(express.json())

const datetoday = format(new Date(),'dd-MM-yyyy-HH-mm-ss')
const filepath = `Timestamp/${datetoday}.txt`
const pathfolder = path.dirname(filepath); // TimeStamp

const filename = path.basename(filepath); // file creation time and extension

app.get('/',(req,res)=>{
    res.status(200).send("Api is running successfully")
})

app.get('/create-date',(req,res)=>{
    fs.writeFileSync(filepath,`${datetoday}`,"utf-8");
    res.status(200).send(`The file created on the folder : ${pathfolder} and the file name is: ${filename}`);
})

app.get('/read-date',(req,res)=>{
    const whole = path.resolve(`${pathfolder}`)

    const data =fs.readdirSync(whole,"utf-8");
    // console.log(data); to check all files are getting 
    res.status(200).json({AllFiles: `${data}`});
})

// running port
app.listen(PORT,()=>{
    console.log(`app is running on the port ${PORT}`);
})