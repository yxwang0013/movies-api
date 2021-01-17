import express from 'express';
import Top_ratedModel from './Top_ratedModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    Top_ratedModel.find().then(movies => res.status(200).send(movies)).catch(next);
  });


export default router;