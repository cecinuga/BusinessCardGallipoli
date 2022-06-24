const express = require('express');
const dbo = require('../db/conn');
const ObjectId = require("mongodb").ObjectId;

const { EmailValidator, HolCodeValidator, PasswordValidator } = require('./tools');
const { createHmac } = require('crypto');

const recordRoutes = express.Router();

recordRoutes.route('/').post(function(req, res){});
recordRoutes.route('/registrazione').post(function(req, res){
    if(PasswordValidator(req.body.password)&&HolCodeValidator(req.body.holcode)&&EmailValidator(req.body.email)){
        req.body.password = createHmac('sha256', req.body.password).digest('hex');
        const User = {
            email:req.body.email,
            password:req.body.password,
            holcode:req.body.holcode,
        };
        const db_connect = dbo.getDb();
        db_connect
            .collection("Users")
            .insertOne(User)
            .then(() => { res.json({status:"REGOK", email:req.body.email, holcode:req.body.holcode}) })
        };
});
recordRoutes.route('/login').post(function(req, res){
    if(req.body.password!='' && EmailValidator(req.body.email)){ 
        const hashed_password = createHmac('sha256', req.body.password).digest('hex');
        req.body.password = hashed_password;

        const db_connect = dbo.getDb();
        db_connect
            .collection("Users")
            .find({
                $and: [
                    {email: {$eq: req.body.email}},
                    {password: {$eq: req.body.password}}
                ]})
            .toArray(function(err, result) {
                console.log('result: ',result)
                if(err) throw err;
                if(result==''){
                    result = "NOTLOGGEDIN";
                    console.log(result)
                    res.json(result)
                } else if(result!=''){
                    result[0].status = "LOGGEDIN";
                    console.log(result)
                    res.json(result[0])
                }
            })
    }
});
recordRoutes.route("/houses").post(function(req, res){
    //console.log('Houses...')
    console.log('req.body: ',req.body)
    if(req.body.status==='FETCHFILTERS'){
        //console.log('fetchFilters ricevuta...')
        const db_connect = dbo.getDb();
        db_connect
            .collection("Houses")
            .find({})
            .toArray(function(err, filter) {
                const locations = filter.map(h => { return h.location; });
                const location = [...new Set(locations)]

                const ns_posti = filter.map(h => { return h.posti })
                const s_posti = ns_posti.sort()
                const posti = [...new Set(s_posti)]

                const filters = [ 
                    {label:'location', value:null, options:location},
                    {label:'posti', value:null, options:posti}
                 ]

                //console.log('filters: ',filters)
                res.json(filters)
            })
    }  else if(req.body.status==='FETCHHOUSES'){
        //console.log('fetchHouses ricevuta...')
        const db_connect = dbo.getDb();
        let query = {
            $and: [
            ]
        }
        req.body.filter.map((f)=>{
            console.log('f: ',f)
            if(f.label===null||f.value===null) return;
            query.$and.push( {[f.label]:{$eq: f.value}}, )
        })
        if(query.$and.length===0){ 
            console.log('query vuota.') 
            query.$and[0] = { location: { $type: 'string' } }
        }

        console.log('query: ',query)
        db_connect
            .collection("Houses")
            .find(query)
            .toArray(function(err, houses) {
                console.log('Mando Housessss....')
                res.json(houses)
            })
    }
});

module.exports = recordRoutes;
