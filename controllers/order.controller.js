import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";
import createError from "../utils/CreateError.js";
import Stripe from "stripe";

export const PaymentIntent = async(req, res , next)=>{
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const gig = await Gig.findById(req.params.id);
  const seller = await User.findById(gig.userId);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 369,
    currency: "aed",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = new Order({
    gigId: gig._id, 
    img: gig.cover,
    title: gig.title,
    price: gig.price,
    sellerId: gig.userId,
    buyerId: req.userId,
    payment_intent: paymentIntent.id,
    buyerUsername:req.body.buyerUsername,
    buyerCountry:req.body.buyerCountry,
    sellerUsername:seller.username,
    sellerCountry:seller.country,

  });
    const savedOrder = await newOrder.save();
  
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}


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
