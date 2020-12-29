// import {Schema, Document, Model} from "mongoose";
// // import {setLastUpdated, sameLastName} from "./users.methods";
// // import {findOneOrCreate, findByAge} from "./users.statics";

// const UserSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     age: Number,
//     dateOfEntry: {
//         type: Date,
//         defalut: new Date()
//     },
//     lastUpdated: {
//         type: Date,
//         defalut: new Date()
//     }
// })

// export interface IUser {
//     firstName: string;
//     lastName: string;
//     age: Number;
//     dateOfEntry?: Date;
//     lastUpdated?: Date;
// }
// export interface IUserDocument extends IUser, Document { // methods
//     setLastUpdated: (this: IUserDocument)=> Promise<void>;
//     sameLastName: (this:IUserDocument)=> Promise<Document[]>;
// }

// export interface IUserModel extends Model<IUserDocument>{ // statics
//     findOneOrCreate: (
//         this: IUserModel, 
//         {
//         firstName,
//         lastName,
//         age,
//         } : {firstName: string, lastName: string, age:number}
//         ) => Promise<IUserDocument>;

//     findByAge: (
//         this: IUserModel,
//         min?: number,
//         max?: number
//     ) => Promise<IUserDocument[]>;

// }


// UserSchema.statics.findOneOrCreate = async function findOneOrCreate(
//     this:IUserModel, userId:string) : Promise<IUserDocument> {
//         const record = await this.findOne({userId});
//         if(record){
//             return record;
//         }else{
//             return this.create({userId});
//         }
    
// };
// UserSchema.statics.findByAge = async function findByAge(
//     this:IUserModel, min?: number, max?:number): Promise<IUserDocument[]> {
//     return this.find({age:{$gte: min || 0, $lte: max || Infinity}});
// };



// UserSchema.methods.setLastUpdated = async function setLastUpdated(
//     this:IUserDocument): Promise<void> {
//     const now = new Date();
//     if(!this.lastUpdated || this.lastUpdated < now) {
//         this.lastUpdated =now;
//         await this.save();
//     }
// }
// // UserSchema.methods.setLastUpdated=setLastUpdated;
// UserSchema.methods.sameLastName = async function sameLastName(
//     this:IUserDocument): Promise<Document[]> {
//     return this.model("user").find({lastName: this.lastName});
// };

// export const UserModel = model<IUserDocument>("User", UserSchema);

// // export default UserSchema;