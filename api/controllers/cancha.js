import Cancha from "../models/Cancha.js";


export const createCancha = async (req,res,next) => {

    const newCancha = new Cancha(req.body);

    try{
        const savedCancha = await newCancha.save()
        res.status(200).json(savedCancha)

    }catch(err){
        next(err);
    }
}
export const updateCancha = async (req,res,next) => {

    try{
    const updateCancha = await Cancha.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new:true});

        res.status(200).json(updateCancha)

    }catch(err){
        next(err);
    }
}
export const deleteCancha = async (req,res,next) => {

    try{
        await Cancha.findByIdAndDelete(
           req.params.id
       );   
       res.status(200).json("La cancha ha sido eliminada.")

   }catch(err){
        next(err);
    }
}
export const getCancha = async (req,res,next) => {

    try{
        const cancha = await Cancha.findById(
            req.params.id
        );   
        res.status(200).json(cancha)

    }catch(err){
        next(err);
    }
}

export const getCanchas = async (req, res, next) => {
    const { min, max, ...others } = req.query;
  
    try {
      const filter = others;
      delete filter.limit;
  
      let canchas;
      if (min !== undefined && max !== undefined) {
        canchas = await Cancha.find({
          ...filter,
          cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        }).limit(parseInt(req.query.limit));
      } else {
        canchas = await Cancha.find(filter).limit(parseInt(req.query.limit) || 0);
      }
  
      res.status(200).json(canchas);
    } catch (err) {
      next(err);
    }
  }

export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(",")

    try{
        const list = await Promise.all(cities.map(city=>{
            return Cancha.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
}
export const countByType = async (req,res,next) => {
    try{
    const futbol5Count = await Cancha.countDocuments({type:"futbol 5"});
    const futbol6Count = await Cancha.countDocuments({type:"futbol 6"});
    const futbol7Count = await Cancha.countDocuments({type:"futbol 7"});
    const futbol8Count = await Cancha.countDocuments({type:"futbol 8"});
    const futbol9Count = await Cancha.countDocuments({type:"futbol 9"});
    const futbol10Count = await Cancha.countDocuments({type:"futbol 10"});
    const futbol11Count = await Cancha.countDocuments({type:"futbol 11"});

        res.status(200).json([
            {type:"futbol 5", count:futbol5Count},
            {type:"futbol 6", count:futbol6Count},
            {type:"futbol 7", count:futbol7Count},
            {type:"futbol 8", count:futbol8Count},
            {type:"futbol 9", count:futbol9Count},
            {type:"futbol 10", count:futbol10Count},
            {type:"futbol 11", count:futbol11Count},
        ]);
    }catch(err){
        next(err);
    }
}

