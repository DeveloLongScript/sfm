export default function getFilesystemPort(): Promise<number> {
    return new Promise((resolve, reject) => {
        fetch("/api/misc-api/isDevelopmentMode").then((res) => res.json()).then((res) => {
            if ((res.data) as boolean == true) {
                resolve(3002)
            } else {
                fetch("/api/misc-api/getServerPort").then((res) => res.json()).then((res) => {
                    if (!Number.isNaN(res.result as number)) {
                        resolve(res.result as number)
                    } else {
                        reject("server port tampered (NaN)")
                    }
                })
            }
        }).catch(() => {
            reject("error with fetch")
        })
    })
}