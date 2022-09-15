import type ColorProcessor from "./color-processor";

export default class ColorProcessorCode implements ColorProcessor<number> {

    getColor(value: number): string {
        if (value >= 200 && value <= 299) return "#B9F6CA"
        else if (value >= 300 && value <= 399) return "#84FFFF"
        else if (value >= 400 && value <= 499) return "#FFE57F"
        else if (value >= 500 && value <= 599) return "#FF8A80"
        else return "var(--color-primary)"
    }

}