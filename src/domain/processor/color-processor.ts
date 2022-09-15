export default interface ColorProcessor<Input> {

    getColor(value: Input): string

}
