import requestMiddleware from "@/requestStats";
import { NextApiRequest, NextApiResponse } from "next"
import {ConfType, readConfiguration, writeConfiguration} from "../../../configUtil"

export default (req: NextApiRequest, res: NextApiResponse) => {
    // this HAS to run for every api request
    requestMiddleware()
    var config = readConfiguration()
    if ((<ConfType>config).setupYet == undefined) {
        res.status(500).send({code: 500, message: "It looks like the configuration file has been tampered with."})
    } else {
        res.send({code: 200, data: (config as ConfType).setupYet})
    }
    

    
}