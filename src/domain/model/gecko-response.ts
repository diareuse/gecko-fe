export interface GeckoResponse {
    code: number
    message: string
    protocol: string
    headers: string[]
    length: number
    contentType: string
    body: string
}