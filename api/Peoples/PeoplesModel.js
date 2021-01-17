import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PeoplesSchema = new Schema({
    adult: { type: Boolean },
    also_known_as: [{ type: String }],
    biography: {type: String},
    birthday: {type: String},
    deathday: {type: String},
    gender: {type: Number},
    homepage: {type: String},
    id: {type: Number, required: true, unique: true},
    imdb_id: {type: String},
    known_for_department: {type: String},
    name: {type: String},
    place_of_birth: {type: String},
    popularity: {type: Number},
    profile_path: {type: String}
});

PeoplesSchema.statics.findByPeoplesDBId = function (id) {
    return this.findOne({ id: id });
  };
  
  export default mongoose.model('Peoples', PeoplesSchema);
