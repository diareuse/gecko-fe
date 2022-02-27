export function promiseOf<type>(body: type | (() => type)): Promise<type> {
    if (typeof body === "function") {
        return promiseOfLambda(body as () => type)
    } else {
        return promiseOfSingle(body as type)
    }
}

function promiseOfSingle<type>(item: type): Promise<type> {
    return new Promise((resolve) => { resolve(item) })
}

function promiseOfLambda<type>(body: () => type): Promise<type> {
    return new Promise((resolve, reject) => {
        try {
            resolve(body())
        } catch (err) {
            reject(err)
        }
    })
}