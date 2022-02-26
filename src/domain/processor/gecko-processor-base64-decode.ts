import type { GeckoProcessor } from "./gecko-processor";

export class GeckoProcessorBase64Decode implements GeckoProcessor {

    parse(input: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                resolve(atob(input))
            } catch (error) {
                reject(error)
            }
        })
    }

}
