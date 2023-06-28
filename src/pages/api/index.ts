import requestMiddleware from "@/requestStats";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // this HAS to run for every api request
  requestMiddleware()
  res.send({
    code: 200,
    message: "🍌 goggo we have until july 29!!!",
  });
};
