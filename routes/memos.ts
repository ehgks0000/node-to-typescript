import express from "express";
import auth from "../middleware/auth";

const router = express.Router();
import {getMemo, writeMemo, getMemobyId} from "../controllers/memos";



router
.route("/")
.get(auth, getMemo)
.post(auth, writeMemo);

router
  .route('/:memoId')
//   .delete(auth, deleteMemo)
  .get(auth, getMemobyId)
//   .patch(auth, patchMemo);

export = router;
