import express from 'express';
import Now_playingModel from './Now_playingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    Now_playingModel.find().then(movies => res.status(200).send(movies)).catch(next);
  });


export default router;