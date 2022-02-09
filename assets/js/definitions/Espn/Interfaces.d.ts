/**
 * @interface {Object} EspnData
 * An object literal, used a placeholder for data from ESPN.
 */
interface EspnData {
    [name:string]: string
}

/**
 * @interface EspnSearchAndReplace
 * Takes a keyword and searches for it in template.
 * The value is used as the replacement text.
 */
interface EspnSearchAndReplace {
    [keywordToReplace:string]: string
}

/**
 * @interface EspnImgElement
 * This is used to dynamically create img elements.
 */
interface EspnImgElement {
    template: InnerHTML;
    replacement: EspnSearchAndReplace
}

