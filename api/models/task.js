import mongoose from 'mongoose';

let Task = new mongoose.Schema({
    title: {
       type: String,
       required: [true, 'oops! Title is required.']
    },
    owner: String,
    done: Boolean
});

export default mongoose.model('Task', Task);