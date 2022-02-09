import { Espn } from "./Espn";

/**
 * @property {Array<string>} keys
 * @property {Array<string>} customKeys
 * @property {number} id
 * @property {string} name
 * @property {number} jersey
 * @property {string} position
 * @property {InnerHTML} headshotImg
 * @property {number} feet
 * @property {number} inch
 * @property {number} weight
 * @property {number} height
 * @property {number} age
 * @property {URL} headshot
 */
declare class Player extends Espn {
    keys: Array<string>
    customKeys: Array<string>
    id: number
    name: string
    jersey: number
    position: string
    headshotImg: InnerHTML
    feet: string
    inch: string
    weight?: number
    height?: number
    age?: number

    get headshot(): URL

    constructor()
}