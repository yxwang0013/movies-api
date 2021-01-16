import express from 'express';
import PeoplesModel from './PeoplesModel';

const router = express.Router();


router.get('/', (req,res,next)=>{
    PeoplesModel.find().then(Peoples => res.status(200).send(Peoples))
    .catch(next);
});

//Get details of one actor
router.get('/:id', (req,res,next)=>{
    const id = parseInt(req.params.id);
    PeoplesModel.findByPeoplesDBId(id).then(Peoples => res.status(200).send(Peoples))
    .catch(next);
});

export default router;
