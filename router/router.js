const express = require ("express")

const router =express.Router()

const {

    createAnimal,
    sellAnimal,
    viewAnimal,
    soldAnimal,
    notSold,
    matureAnimal,
    deleteSoldAnimal,
    updateAnimalAge

}= require("../contoller/controller")


const requestTime = require("../middlewaer/middlewear")



//endpoint to add animal 
router.post("/create", requestTime, createAnimal)

//endpoint to sell animal 
router.put("/sell/:animalId",requestTime, sellAnimal)


//endpoint to get available animal 
router.get("/view",requestTime, viewAnimal)

//endpoint to get sold animal 
router.get("/getSold",requestTime ,soldAnimal)

//endpoint for not sold
router.get("/notSold",requestTime ,notSold)


//endpint for matured animal
router.get("/viewmatured", requestTime, matureAnimal)

//endpint to delete animal
router.delete("/deleteSold/:animalId", requestTime, deleteSoldAnimal)

//endpint to update animal age
router.put("/update/:animalId", requestTime, updateAnimalAge)

module.exports= router


