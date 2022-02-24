import type { GeckoProcessor } from "./gecko-processor";

export class GeckoProcessorBase64Decode implements GeckoProcessor {

    parse(input: string): string {
        const percentEncodedStr = atob(input)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('');

        return decodeURIComponent(percentEncodedStr);
    }

}
