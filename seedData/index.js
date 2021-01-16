import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import PeoplesModel from '../api/Peoples/PeoplesModel';
import { movies } from './movies.js';
import { getPeoples } from '../api/tmdb-api';
import { getNow_playingMovies } from '../api/tmdb-api';
import Now_playingModel from '../api/Now_playing/Now_playingModel';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadPeoples() {
  console.log('load actors');
  try {
    getPeoples().then(async res => {
      await PeoplesModel.deleteMany();
      await PeoplesModel.collection.insertMany(res);
      console.info(`${res.length} actor were successfully stored.`);

    });
  } catch (err) {
    console.error(`failed to Load actor Data: ${err}`);
  }
}

export async function loadNow_playing() {
  console.log('load Now_playing');
  try {
    getNow_playingMovies().then(async res => {
      await Now_playingModel.deleteMany();
      await Now_playingModel.collection.insertMany(res);
      console.info(`${res.length} movies were successfully stored.`);

    });
  } catch (err) {
    console.error(`failed to Load movies Data: ${err}`);
  }
}