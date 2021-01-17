import express from 'express';
import SimilarModel from './SimilarModel';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const movie = await SimilarModel.findByMovieDBId(id);
    if (movie) {
        SimilarModel.findByMovieDBId(id).then(nowplaying => res.status(200).send(nowplaying))
        .catch(next);
    } else {
      res.status(404).send({ message: `Unable to find movie with id: ${id}.`, status: 404 });
    }
  });


export default router;