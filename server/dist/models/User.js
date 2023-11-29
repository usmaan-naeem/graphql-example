import { model, Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
});
const User = model('User', userSchema);
export default User;
