import type { GeckoProcessor } from "./gecko-processor";
import * as zip from "@zip.js/zip.js";

export class GeckoProcessorInflate implements GeckoProcessor {

    async parse(input: string): Promise<string> {
        const reader = new zip.ZipReader(new zip.TextReader(input))
        const entries = await reader.getEntries();
        this.throwIfEmpty(entries);
        const data = await this.getData(entries);
        return this.getJoinedData(data);
    }

    private throwIfEmpty(entries: zip.Entry[]) {
        if (!entries.length)
            throw new Error("Entries not found!");
    }

    private async getData(entries: zip.Entry[]): Promise<string[]> {
        const output: string[] = []
        for await (const entry of entries) {
            output.push(await this.getEntryData(entry))
        }
        return output
    }

    private async getEntryData(entry: zip.Entry): Promise<string> {
        const writer = new zip.TextWriter()
        const method = entry.getData
        if (method == null) {
            throw new Error("Method getData not found!");
        }
        return await method.call(entry, writer)
    }

    private async getJoinedData(data: string[]): Promise<string> {
        return data.join('')
    }

}