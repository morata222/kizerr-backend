import createError from "../utils/CreateError.js";
import Gig from "../models/gig.model.js";
import Review from "../models/review.model.js";
export const createReview = async (req, res, next) => {
  const findReview = await Review.findOne({
    gigId: req.body.gigId,
    userId: req.userId,
  });
  if (findReview) {
    return next(createError(500, "You already reviewed this gig"));
  }
  if (req.isSeller) {
    return next(createError(500, "buyers only can review this gig"));
  }
  const review = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    star: req.body.star,
    img: req.body.img,
    username: req.body.username,
    country: req.body.country,
    desc: req.body.desc,
  });
  try {
     await Gig.findByIdAndUpdate(req.body.gigId, {
       $inc: { totalStars: req.body.star, starNumber: 1 },
     });
    const createdReview = await review.save();
     res.status(200).send(createdReview);
    
   } catch (error) {
     next(createError(500, "Something went wrong"));
   }
};
export const getReviews = async (req, res) => {
  const reviews = await Review.find({ gigId: req.params.gigId });
  res.send(reviews);
};
export const deleteReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(createError(404, "Review not found"));
  }
  if (req.userId !== review.userId) {
     next(createError(500, "You can't delete this review"));
  }
  try {
    // decrease the total stars and star number
    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });
    await Review.findByIdAndDelete(req.params.id)
    res.status(200).send("Review deleted successfully");
    
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};
