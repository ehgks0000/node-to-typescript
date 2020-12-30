import mongoose, {Schema, Document, model, Model, Types, DocumentToObjectOptions} from "mongoose";
import jwt from "jsonwebtoken";
// type ID = Types.ObjectId;

interface IUser {
    email: string;
    name: string;
    // _id:Schema.Types.ObjectId;
    googleId?: string;
    naverId?: string;
    kakaoId?: string;
    tokens?: [string];

}

interface IUserDoc extends IUser, Document{ // methods
    generateToken : (secret_key:string, expiresTime:string)=> Promise<string>;
    // toJSON : () => Promise<any>;
}
interface IUserModel extends Model<IUserDoc>{ // statics
    findByToken : (token:string, secret_key:any) => Promise<void>
}
const userSchema :Schema = new Schema({
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

    tokens:[
        {
            token:{
                type:String,
            }
        }
    ]
});

userSchema.virtual('memos', {
    ref: 'Memo',
    localField: '_id',
    foreignField: 'userId',
  });
  //왜 유저 json에 memos가 안나올까? js에서는 잘되는데
// userSchema.set('toObject', { virtuals: true });
// userSchema.set('toJSON', { virtuals: true });

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject({virtual: true});
  
    // delete userObject.password;
    // delete userObject.tokens;
    // delete userObject.avatar;
  
    return userObject;
  };

userSchema.methods.generateToken = async function (secret_key:string, expiresTime:string) : Promise<string>{
    // 첫번째 파라미터는 토큰에 넣을 데이터, 두번째는 비밀 키, 세번째는 옵션, 네번째는 콜백함수
    const user = this;
    const token = jwt.sign({ _id: this._id.toHexString() }, secret_key, {
      expiresIn: expiresTime,
    });
  
    user.tokens = user.tokens.concat({ token: token });
  
    await user.save();
    return token;
  };
  // statics와 methods의 차이 전자는 모델 자체를 가리키고 후자는 데이터를 가리킨다
  userSchema.statics.findByToken = function (token:string, secret_key:any) :void {
    const user = this;
    return jwt.verify(token, secret_key, function (err:any, decoded :any) {
      return user
        .findOne({ _id: decoded, 'tokens.token': token })
        .then((user:IUser) => user)
        .catch((err:any) => err);
    });
  };

const User = model<IUserDoc, IUserModel>("User", userSchema);
// export default mongoose.model('User', userSchema);
export {User, IUser};
