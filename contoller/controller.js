
const {animalModel} = require("../model/model")
const jwt = require ("jsonwebtoken")
require("dotenv")


//craete animal
exports.createAnimal = async (req,res) =>{
    try {
        const{name, breed , age } = req['body']
        const isSold = false
      if (!name){
        return res['status'](404)['json']({
            message : "name is entered incorrectly",
        })
    }
      
    if (!breed){
        return res['status'](404)['json']({
            message : "breed is entered incorrectly",
        })
    }
      
    
    if (!age){
        return res['status'](404)['json']({
            message : "age is entered incorrectly",
        })
    }
      


        const maturedOnes = ()=>{
        if(age >= 5 ){
            return true
        }
    }
    //     let age;

    //     if (age >= 5) {
    //         age = true
    //     } else {
    //         age = false
    //     }
    // }

                const animal= await new animalModel({
            name,
            breed,
            IsMatured : maturedOnes(),
            age,
            isSold,
        })


        if(!animal){
            return res['status'](404)['json']({
                message : "Animal not found",
            })
        }
    
        
        await animal.save()
        return res['status'](200)['json']({
            message:"Animal has been added to record",
            data: animal,
        })

        
    } catch (error) {
      res['status'](500)['json']({
    message : error['message']
      })  
    }
}

                     
// sell an animal
exports.sellAnimal = async (req,res)=>{
    try {
        
        const animalId = req.params.animalId;

        const maturityCheck = await animalModel.findById(animalId)

        if(!maturityCheck){
            res.status(404).json({
                message : "unable to find matured animal "
            })
        }
    
    if (maturityCheck.IsMatured === true){
    const selltheAnimal = await animalModel.findByIdAndUpdate(
        animalId,
        {isSold: true},
        {new:true,})
   return  res.status(200).json({
        message : `Animal with id: ${animalId} has been sold`,
        data: selltheAnimal
    })
}else{
    return res.status(404).json({
        message: `Animal is not yet mature for sale`
    })
}
    
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

//to see all the available animal
exports.viewAnimal = async (req,res) =>{
    try {

        const animal = await animalModel.find().sort({createdAt: -1})
        if(animal.length == 0){
            res.status(404).json({
                    message:'Animal not available to view',
                
            })
        }else{
            res.status(200).json({
                message :`THere are ${animal.length} animals in the database `,
                data : animal
            })


        }
        

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

// get animal that has been sold
exports.soldAnimal = async (req,res) => {
    try{
        
        const animal  = await animalModel.find({isSold : true})
        if(!animal){
            res.status(404).json({
                message:`Animal not found`

            })
        }else{
            res.status(200).json({
                message:` list of ${animal.length} animal has been sold`,
                data: animal

            })
        }


    }catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}


// get animal that has been not been sold
exports.notSold = async (req,res) => {
    try{


        const animal  = await animalModel.find({isSold : false})
        if(!animal){
            res.status(404).json({
                message:`Animal not found`

            })
        }else{
            res.status(200).json({
                message:` list of ${animal.length} animal that has not been sold `,
                data:animal

            })
        }


    }catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

// get animal that has been sold
exports.matureAnimal = async (req,res) => {
    try{
        
        const animal  = await animalModel.find({IsMatured : true})
        if(!animal){
            res.status(404).json({
                message:`Animal not found`

            })
        }else{
            res.status(200).json({
                message:` list of ${animal.length} matured animals `,
                data: animal

            })
        }



    }catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

//delete sold animals
exports.deleteSoldAnimal = async (req,res) => {
    try {
        const animalId = req.params.animalId
        
        const animal = await animalModel.findById(animalId) 

        if(!animal) {
            res.status(404).json({
                message : 'Animal not found'
            })
        }
        if(animal.isSold === true){
        await animalModel.findByIdAndDelete(animalId)
        return res.status(200).json({
            message :`Sold animal with id :${animalId} has been deleted`,
            data : animal
        })
        }else{
            return res.status(400).json({
                message: 'Animal is not sold and cannot be deleted'
            })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}


//to update age
exports.updateAnimalAge = async (req, res) => {
    try {
        const animalId = req.params.animalId;
     

        // Find the animal by ID
        const animal = await animalModel.findById(animalId);

        if (!animal) {
            return res.status(404).json({
                message: 'Animal not found'
            });
        } 
         // Check if the updated age is greater than or equal to 5    
        const { age } = req.body

        const maturedOnes = ()=>{
            if(age >= 5 ){
                return true
            }
        }

        // Update animal details
        const animalData = {
            age : req.body.age || animal.age,
            IsMatured : maturedOnes() || animal.IsMatured,
        }
       
    

        // Save the updated animal
        const updatedAnimal = await animalModel.findByIdAndUpdate(
            animalId,
            animalData,
            {new:true},
           
    )
    
        if (!updatedAnimal){
            res.status(404).json({
                message: `Animal with id: ${animalId} is not found`
            });
        }else{
        return res.status(200).json({
            message: `Animal with ID: ${animalId} has been updated`,
            data: updatedAnimal,
        });
    }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
