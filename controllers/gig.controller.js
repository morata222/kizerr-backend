import Gig from '../models/gig.model.js'
import createError from '../utils/CreateError.js';

// create a new gig
export const createGig = async (req, res , next) => {
  if(!req.isSeller) {next(createError(401, "only sellers can create gigs"));}
  const newGig = new Gig({
    ...req.body,
    userId : req.userId,
  })
   try{
    const savedGig = await newGig.save();
     res.status(201).send(savedGig);
   }
    catch(err){
      next(createError(500, err.message));
    }
}
export const deleteGig = async (req, res , next) => {
   const gig = await Gig.findById(req.params.id);
    if(!req.isSeller) {next(createError(401, "You are not a seller"));}
    if(gig.userId !== req.userId){
      next(createError(401, "You can delete only your gig"));
    }
    try{
      await Gig.findByIdAndDelete(req.params.id);
      res.status(200).json("The gig has been deleted");
    }
    catch(err){
      next(createError(500, err.message));
    }
}
export const getGig = async (req, res , next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    res.status(200).send(gig);
  } catch (error) {
    next(createError(500, error.message));
  }
}
export const getGigs = async (req, res , next) => {
  const q = req.query;
  const filters = {
    ...(q.cat && {cat:q.cat}),
    ...(q.userId && {userId:q.userId}),
    ...(q.title && {title:{$regex:q.search,$options:"i"}}),
    ...((q.min || q.max) && {
      price:{...(q.min && {$gte:q.min}) , ...(q.max && {$lte:q.max})}
    }),
    
  }
  try {
    const gigs = await Gig.find(filters).sort({[q.sort]:-1});
    res.status(200).send(gigs);
  } catch (error) {
    next(createError(500, error.message));
  }
}