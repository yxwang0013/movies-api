import express from 'express';
import UpcomingModel from './UpcomingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    UpcomingModel.find().then(movies => res.status(200).send(movies)).catch(next);
  });


export default router;