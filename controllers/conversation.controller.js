import Conversation from "../models/conversation.model.js";
import createError from "../utils/CreateError.js";

export const createConversation = async (req, res , next) => {
  const conversation = new Conversation({
    ...req.body,
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: (req.isSeller ? req.userId : req.body.to),
    buyerId: (req.isSeller ? req.body.to : req.userId),
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const newConversation = await conversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    next(createError(409 , error.message))
  }
};
export const updateConversation = async (req, res , next) => {
  const updatedConversation = await Conversation.findOneAndUpdate(
    {id:req.params.conversationId},
    { $set: { readBySeller: req.isSeller, readByBuyer: !req.isSeller } },
    { new: true }
  );
  try {
    res.status(201).json(updatedConversation);
  } catch (error) {
    next(createError(409 , error.message))
  }
};
export const getConversation = async (req, res , next) => {
   const conversation = await Conversation.findOne({id:req.params.conversationId});
   if(!conversation) return next(createError(404 , "Conversation not found"))
  try {
    res.status(201).json(conversation);
  } catch (error) {
    next(createError(409 , error.message))
  }
};
export const getAllConversations = async (req, res , next) => {
  const conversations = await Conversation.find( req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}).sort({updatedAt:-1});
  try {
    res.status(201).json(conversations)
  } catch (error) {
    next(createError(409 , error.message))
  }
};
