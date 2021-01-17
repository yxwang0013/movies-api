import express from 'express';
import Now_playingModel from './Now_playingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  Now_playingModel.find().then(movies => res.status(200).send(movies)).catch(next);
});
router.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = await Now_playingModel.findByMovieDBId(id);
  if (movie) {
    Now_playingModel.findByMovieDBId(id).then(nowplaying => res.status(200).send(nowplaying)).catch(next);
  } else {
    res.status(404).send({ message: `Unable to find movie with id: ${id}.`, status: 404 });
  }
});

router.post('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = await Now_playingModel.findByMovieDBId(id);
  if (movie) {
    Now_playingModel.updateOne({ id: id }, req.body).then(res.status(200).send({ message: `Update the content of the movie with id : ${id}`, status: 200 })).catch(next);
  } else {
    res.status(404).send({ message: `Unable to find movie with id: ${id}.`, status: 404 });
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const movie = await Now_playingModel.findByMovieDBId(id);
  if (movie) {
    Now_playingModel.deleteOne({ id: id }).then(res.status(200).send("delete successfully"))
      .catch(next);
  } else {
    res.status(404).send("can't find the movie");
  }
});

export default router;