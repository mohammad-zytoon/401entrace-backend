'use strict';
const express= require ('express');
const cors= require('cors');
const axios= require('axios');
require('dotenv').config();
const mongoose=require('mongoose');
const server=express();
server.use(cors());
const PORT= process.env.PORT;



server.get('/', testHandler);
server.get('/digimons', digimonsHandler);

async function digimonsHandler(req,res){
    const url=`https://digimon-api.vercel.app/api/digimon?`;
    await axios.get (url).then(
        result=>{
            console.log(result.data)
            const digimonsArray= result.data.map(digimon=>{
                
                return new digimon (digimon);})
                console.log("111111", digimonsArray);
                res.send(digimonsArray)
                
            }
    ) 

}


function testHandler(req,res){res.send('testing the rout')}

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})



class digimon{
    constructor(data){
        this.name=data.digimon.name,
        this.img=data.digimon.img,
        this.level=data.digimon.level
    }
}