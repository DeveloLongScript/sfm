import requestMiddleware from "@/requestStats";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // this HAS to run for every api request
  requestMiddleware()
  // deadline until i this repo has to be public ( oh no )
  res.send({
    code: 200,
    message: "🍌 goggo we have until july 29!!!",
  });
};
