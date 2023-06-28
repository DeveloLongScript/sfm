import { readStatConfiguration } from "@/configUtil";
import { runMiddleware } from "@/corsUtil";
import requestMiddleware from "@/requestStats";
import Cors from "cors"
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    runMiddleware(req, res, Cors({
        methods: ['POST', 'GET', 'HEAD'],
      }))
    requestMiddleware();
    res.send(readStatConfiguration())

}