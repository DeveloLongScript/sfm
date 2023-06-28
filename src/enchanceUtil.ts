import { ConfType, readConfiguration } from "./configUtil"

export function enchanceRead(): ConfType {
    var config = readConfiguration()
    if ((<ConfType>config).setupYet == undefined) {
        return {storageLocation: "|||||||||tampered|||||||||", setupYet: false}
    }
    return <ConfType>config
}