export declare type DelimiterLambda = (value: string) => boolean

export default class PartProcessor {

    private queryRegex = /(?:https?:\/\/[\S]+\/\?q=)(.*)/
    private delimiter: DelimiterLambda

    constructor(
        delimiter: DelimiterLambda = (it) => it.indexOf(" ") >= 0
    ) {
        this.delimiter = delimiter
    }

    process(content: string): string[] {
        const lines = content.split(/\n/)
        const factory = new PartFactory()

        for (const _line of lines) {
            const line = _line.trim()
            if (this.delimiter(line)) {
                continue
            }

            const results = this.queryRegex.exec(line)
            if (results) {
                factory.end()
                factory.put(results[1])
            } else {
                factory.put(line)
            }
        }

        return factory.build()
    }

}

class PartFactory {

    private product: string = ""
    private products: string[] = []

    put(part: string) {
        if (part.trim().length <= 0)
            return
        this.product += part
    }

    end() {
        if (this.product.length > 0) {
            this.products.push(this.product)
            this.product = ""
        }
    }

    build(): string[] {
        if (this.product.length > 0) {
            this.end()
        }
        return this.products
    }

}