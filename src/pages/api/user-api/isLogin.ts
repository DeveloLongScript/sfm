import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.send({code: 200, result: req.cookies.loginToken != undefined})
}