import express from 'express';
import {archiveReviewById, createReview, deleteReviewById, getAllReviews, getReviewById, updateReviewById} from "../../controllers/reviewsController.js"

const router = express.Router();


router.get('/', getAllReviews)
router.post('/', createReview)
router.get('/:id',getReviewById)
router.delete('/:id', deleteReviewById)
router.put('/:id', updateReviewById)
router.delete('/archive/:id', archiveReviewById)

export default router;
