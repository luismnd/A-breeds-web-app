const { Router } = require('express');
const { API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const db = require('../db');


const router = Router();
module.exports = router;

const handleRawDataReqs = async function (breed = null) {
    
    var apiUrl = 'https://api.thedogapi.com/v1/breeds';
    breed? apiUrl += `/search?q=${breed}` : apiUrl;     //AVAILABLE END POINTS

    try {
        const apiResponse = await axios(apiUrl, {headers: {'x-api-key': `${API_KEY}`}});
        const apiBreeds = apiResponse.data.map(breed => {
            return {
                id: breed.id,
                name: breed.name,
                height: breed.height.metric,
                weight: breed.weight.metric.split(' ')[0],
                life_span: breed.life_span,
                temperament: breed.temperament ? breed.temperament.split(', ') : [], //DO NOT CHANGE [] -> CRASHES GET/TEMPS
                image: breed.image?.url,
                reference_image_id: breed.reference_image_id,
            }
        });
        const dbBreeds = await Dog.findAll(breed?{where:{name: breed}}:{});
        return dbBreeds.concat(apiBreeds);

    } catch (error) {
        console.error(error);
    }
};


router.get('/dogs', async function(req, res) {
    const breeds = await handleRawDataReqs(req.query.name?req.query.name:null);
    breeds.length
        ?res.json(breeds)
        :res.json({message: "No breeds found"});
});


router.get('/dogs/:breedId', async function(req, res) {
    const breedId = req.params.breedId;
    const breeds = await handleRawDataReqs();
    const breed = breeds.filter(b => {return b.id.toString() === breedId})
    breed.length
    ?res.json(breed)
    :res.json({message: "No breed found for that id"});
});


router.get('/temperament', async function(req, res) {
    const breeds = await handleRawDataReqs();
            //HIGHLY SENSITIVE STUFF, hrsWastedCount += 12
            //RETRIEVE ARR OF ARRS OF TEMPS
    const tempsArrs = breeds.map(b=>b.temperament);
            //MAP ARR AND WALKS THROUGH ARRS RETRIEVING EVERY TEMP
    var temps = [];
    const tempsOp = await tempsArrs.map(t=>{for(let i=0;i<t.length;i++) temps.push(t[i])});
            //CREATE TEMPS IN DB AVOIDING REPS
    temps.forEach( t => { 
        t ? Temperament.findOrCreate({ where: {name: t}}) : null;
    });
    const dbTemps = await Temperament.findAll();
    res.json(dbTemps);
});


router.post('/dog', async function(req, res) {
    const { id, name, minWeight, maxWeight, minHeight, maxHeight, years, temperament } = req.body;
    console.log(req.body);
    let newDog = await Dog.findOrCreate(
        {where:{name: name},
         defaults: {
            id: id,
            weight: minWeight+" - "+maxWeight,
            height: minHeight+" - "+maxHeight,
            life_span: years,
            temperament: temperament,
        }});
    res.json(newDog);
});