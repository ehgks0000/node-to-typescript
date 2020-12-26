import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    email: string;
    name: string;
    googleId: string;
    naverId: string;
    kakaoId: string;
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Number,
        default: Date.now()
    },
    googleId: {
        type: String,
    },
    naverId: {
        type: String,
    },
    kakaoId: {
        type: String,
    },


});

// userSchema.pre<IUser>('save', async function (next) {
//     const user = this;
//     if(!user.isModified('password')) return next();
 
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     next();
 
//  });


export default mongoose.model<IUser>('User', userSchema);
