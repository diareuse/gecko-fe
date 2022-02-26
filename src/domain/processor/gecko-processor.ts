export interface GeckoProcessor {

    parse(input: string): Promise<string>

}