export interface GeckoProcessor {

    parse(input: string): Promise<Uint8Array>

}