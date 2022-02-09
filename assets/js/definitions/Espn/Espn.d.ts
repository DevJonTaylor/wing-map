import './Interfaces';

/**
 * This is the Base class for the Models that will handle the ESPN data.
 * @class Espn
 *
 * @property {Array<string>} keys
 * @property {Array<string>} customKeys
 * @property {string} delimiter
 * @property {EspnImgElement} img
 *
 * @property {HTMLElement} containerElement
 * @property {InnerHTML} logoImg Provides an image element InnerText
 * @property {EspnData} Creates Object Literal representation of this class.
 */
declare class Espn {
    keys: Array<string>
    customKeys: Array<string>
    delimiter: string
    img: EspnImgElement

    get containerElement(): HTMLElement
    get toObject(): EspnData

    /**
     * Assigns the template {replacements.template}
     * @param {string} str
     */
    set imgTemplate(str: string)

    constructor(data: EspnData)

    /**
     * This method creates the image element and returns it.
     * @param {string} src
     */
    createImg(src: string):InnerHTML

    /**
     * Consumes the new data and replaces any data in the way.
     * @param {EspnData} data
     * @return {this} For chaining purchases.
     */
    parse(data: EspnData): this

    /**
     * Sets the CSS Selector and element that it receives from the query.
     * @param {string} cssSelector
     * @return {string} For chaining.
     */
    container(cssSelector: string): this

    /**
     * Optionally you can pass and set the CSS Selector/container here.
     * Using the keys/customKeys to search for replacements.
     * Replacements will be surrounded by the delimiter property.
     *
     * @param {string} cssSelector?
     * @return {this} For chaining.
     */
    render(cssSelector?: string): this

    /**
     * Uses an object literal to find and replace a string.
     * @param {string} str
     * @param {EspnData} replaceObj
     * @return {string}
     */
    replace(str, replaceObj): string

    /**
     *  @return {string} A serialized representation of this class.
     */
    toString(): string
}