export interface GeckoRequest {
    method: string,
    url: string,
    headers: string[],
    length: number,
    contentType: string,
    body: string
}