import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', "loginToken=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;")
    res.send({code: 200, message: "Successfully logged out of account"})
}