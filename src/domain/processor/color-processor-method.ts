import type ColorProcessor from "./color-processor";

export default class ColorProcessorMethod implements ColorProcessor<string> {

    getColor(value: string): string {
        switch (value.toLowerCase()) {
            case "get": return "#89D1B6"
            case "head": return "#5658D3"
            case "post": return "#4E9FFA"
            case "put": return "#9EA4B4"
            case "delete": return "#FD7D78"
            case "connect": return "#D68EF0"
            case "options": return "#E2CA8C"
            case "trace": return "#91E074"
            case "patch": return "#9F7685"
            default: return "var(--color-primary)"
        }
    }

}