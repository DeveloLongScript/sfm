import * as fs from "fs"

export default function getFileStruct(): String[] {
    var fileread = fs.readFileSync("configuration/structcache.json", "utf-8")
    return JSON.parse(fileread)
}