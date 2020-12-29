import {Memo} from "../models/memos";
import {Request, Response, NextFunction} from "express"

export const getMemo = async (req: Request | any, res: Response | any)=>{
    // type Populated<M, K extends keyof M> =
    //     Omit<M, K> &
    //     {
    //         [P in K]: Exclude<M[P], ID[] | ID>
    //     };
    try {
        await req.user.populate("memos").execPopulate();
        // await req.user.populate("memos") as Populated<IUserDoc, memos>;
        console.log("메모찾기 완료");
        res.json(req.user.memos);

    } catch (e) {
        console.log("메모찾기 오류");
        res.status(500).send();
    }
}

export const getMemobyId = async (req : Request | any, res:Response | any) => {
    const _id = req.params.memoId;
    try {
      const memo = await Memo.findOne({ _id, userId: req.user._id });
      // await memo.populate('userId').execPopulate();
      // memo.userId;
  
      if (!memo) {
        return res.status(404).send();
      }
      return res.send(memo);
    } catch (e) {
      res.status(500).send();
    }
  
    //   const user = await User.findById();
    //   await user.populate('memos').execPopulate();
    //   user.memos;
  
    // return res.json({ memo: memo.userId });
  };

  export const writeMemo = async (req:Request | any, res:Response) => {
    //   const text = req.body.text;
    //   const memo = new Memo({ text: text });
    console.log(req.user);
    try {
      const memo = new Memo({ ...req.body, userId: req.user._id });
      memo
        .save()
        .then(() => {
          console.log('메모작성 : ', req.user.email);
          return res.json({ memo });
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      res.status(500).json({message: "메모작성 오류", e});
    }
  };