import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/CreateError.js";

export const createOrder = async (req, res, next) => {
  if(req.isSeller){
    next(createError(500 , "Sellers can't create order for their own gigs"))
  }
  const gig = await Gig.findById(req.params.id);
  const newOrder = new Order({
    gigId: gig._id, 
    img: gig.cover,
    title: gig.title,
    price: gig.price,
    sellerId: gig.userId,
    buyerUsername:req.body.username,
    buyerCountry :req.body.country,
    buyerId: req.userId,
    payment_intent: "temporary",
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (error) {
    next(createError(404 , "something went wrong"));
  }
};

export const getOrders = async(req, res , next)=>{
  try{
     const orders = await Order.find({
       ...(req.isSeller? {sellerId:req.userId} : {buyerId:req.userId}),
        isCompleted:true
     })
      res.status(200).send(orders);
   }
   catch(err)
   {
    next(createError("404" , "something went wrong"))
   }
}
