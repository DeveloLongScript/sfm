import { ConfType, readConfiguration } from "./configUtil"

/**
 * reads the config with knowledge
 * @returns a type that nots 100% bug free
 */
export function enchanceRead(): ConfType {
    // read config
    var config = readConfiguration()
    if ((<ConfType>config).setupYet == undefined) {
        // tampered? return a location
        return {storageLocation: "|||||||||tampered|||||||||", setupYet: false}
    }
    return <ConfType>config
}