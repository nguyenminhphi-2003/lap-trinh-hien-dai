import Product from "../model/product.js";

export const getProducts =async( req, res) =>{
   try{
      const data =await Product.find();
      if(data.length<0){
         return res.status(404).json({message: "NO product"})
      }
      res.status(201).json(data);
    }catch(error){
      res.status(500).json({message:error.message});
    }
 };


 export const getProductsById =async( req, res) =>{
   try{
      const data =await Product.findOne({_id:req.params.id});
      if(data.length<0){
         return res.status(404).json({message: "NO product"})
      }
      res.status(201).json(data);
    }catch(error){
      res.status(500).json({message:error.message});
    }
 };


 export const addProducts =async( req, res) =>{
    try{
      const data = await Product(req.body).save();
      res.status(201).json(data);
    }catch(error){
      res.status(500).json({message:error.message});
    }
 };




 export const deleteProducts =async( req, res) =>{
   try{
      const data =await Product.findOneAndDelete({_id:req.params.id});
      if(data.length<0){
         return res.status(404).json({message: "NO product"})
      }
      res.status(201).json(data);
    }catch(error){
      res.status(500).json({message:error.message});
    }
 };


 
 export const updateProducts =async( req, res) =>{
   try{
      console
      const data =await Product.findOneAndUpdate({_id:req.params.id}, req.body, {new: true
      });
      console.log("data",data);
      if(data.length<0){
         return res.status(404).json({message: "NO product"})
      }
      res.status(201).json(data);
    }catch(error){
      res.status(500).json({message:error.message});
    }
 };