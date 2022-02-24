import type { GeckoMetadata } from "@/domain/model/gecko-metadata"
import type { GeckoRequest } from "@/domain/model/gecko-request"
import type { GeckoResponse } from "@/domain/model/gecko-response"
import type { MetadataAdapter } from "./metadata-adapter"

export class MetadataAdapterDefault implements MetadataAdapter {

    adapt(query: string): GeckoMetadata {
        return {
            request: this.getRequest(query),
            response: this.getResponse(query)
        }
    }

    private getRequest(query: string): GeckoRequest {
        return {
            method: this.getString(query, "m"),
            url: this.getString(query, "u"),
            headers: this.getStringArray(query, "h", "\n"),
            length: this.getNumber(query, "l"),
            contentType: this.getString(query, "t"),
            body: this.getString(query, "b")
        }
    }

    private getResponse(query: string): GeckoResponse {
        return {
            code: this.getNumber(query, "c"),
            message: this.getString(query, "M"),
            protocol: this.getString(query, "p"),
            headers: this.getStringArray(query, "H", "\n"),
            length: this.getNumber(query, "L"),
            contentType: this.getString(query, "T"),
            body: this.getString(query, "B"),
        }
    }

    private getString(query: string, token: string): string {
        const start = String.fromCharCode(2)
        const end = String.fromCharCode(3)
        const key = start + token
        const startIndex = query.indexOf(key) + key.length
        const endIndex = query.indexOf(end, startIndex)
        return query.slice(startIndex, endIndex)
    }

    private getStringArray(query: string, token: string, separator: string): string[] {
        return this.getString(query, token).split(separator)
    }

    private getNumber(query: string, token: string): number {
        const value = this.getString(query, token)
        return Number.parseInt(value)
    }

}