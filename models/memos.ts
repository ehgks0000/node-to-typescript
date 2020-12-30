import mongoose, {Schema, Document, model, Model, Types} from "mongoose";

// const memoSchema = new mongoose.Schema({
    // text: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   // ref: true,
    // },
    // completed: { 
    //     type: String, 
    //     required: true, 
    //     default: false 
    // },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
//   });
const memoSchemaFields: Record<keyof IMemo, any> = {
    text: {
        type: String,
        required: true,
        trim: true,
        // ref: true,
      },
      completed: { 
          type: String, 
          required: true, 
          default: false 
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
}

const memoSchema = new Schema(memoSchemaFields);

type ID = Types.ObjectId;

interface IMemo {
    text: string;
    completed?: string;
    userId: ID | IMemoDoc;
    // userId: Types.ObjectId | Record<string, unknown>;
}

interface IMemoDoc extends IMemo, Document{
    createMemo : (text:string) => Promise<void>
}

interface IMemoModel extends Model<IMemoDoc>{
}
  
memoSchema.methods.createMemo = function (text:string) :void {
   const memo = new this({
     text: text,
   });
   memo.save();
   // return memo.save();
 };

const Memo = model<IMemoDoc, IMemoModel>("Memo", memoSchema);

export {Memo, IMemo};
