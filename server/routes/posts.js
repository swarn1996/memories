import express from 'express';

import { getPost,createPost,updatePost,deletePost ,updateLike} from '../controllers/posts.js';

const router = express.Router();

router.get("/",getPost);
router.post("/",createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',updateLike)


export default router;