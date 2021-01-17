import express from 'express';
import { getMovieReviews } from '../tmdb-api';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', (req, res, next) => {
    movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
    const id = parseInt(req.params.id);
    getMovieReviews(id)
        .then(reviews => res.status(200).send(reviews))
        .catch((error) => next(error));
});

router.post('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        movieModel.updateOne({ id: id }, req.body).then(res.status(200).send({ message: `Update the content of the movie with id : ${id}`, status: 200 }))
            .catch(next);
    } else {
        res.status(404).send({ message: `Unable to find movie with id: ${id}.`, status: 404 });
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        movieModel.deleteOne({ id: id }).then(res.status(200).send("delete successfully"))
            .catch(next);
    } else {
        res.status(404).send("can't find the moive to delete");
    }
});


export default router;