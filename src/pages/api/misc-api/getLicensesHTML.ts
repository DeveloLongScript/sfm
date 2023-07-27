import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs"
import snarkdown from "snarkdown"

export default (req: NextApiRequest, res: NextApiResponse) => {
    var licensesFile = fs.readFileSync("legal/licenses.md", "utf-8")
    res.setHeader("Content-Type", "text/html; charset=utf-8;")
    res.send(snarkdown(licensesFile))
}