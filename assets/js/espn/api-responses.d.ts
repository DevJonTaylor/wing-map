type Color = string;
type Abbreviation = string;

interface PositionInterface {
    id: number;
    name: string;
    displayName: string;
    abbreviation: Abbreviation;
}

interface EspnResponsePosition {
    id: number;
    name: string;
    displayName: string;
    abbreviation: Abbreviation;
}

interface ImageInterface {
    href: URL;
    alt?: string;
    width?: number;
    height?: number;
    rel?: string;
}

interface EspnResponseImage extends ImageInterface {
    id: string;
    name: string;
    displayName: string;
    abbreviation: Abbreviation;
}

interface EspnResponsePlayer {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    displayName?: string;
    shortName?: string;
    weight?: number;
    displayWeight?: string;
    height?: number;
    displayHeight?: string;
    age?: number;
    dateOfBirth?: string;
    headshot?: EspnResponseImage;
    jersey?: string;
    position?: EspnResponsePosition;
    debutYear?: number;
    links?: Array<LinkInterface>
    birthPlace?: BirthPlaceInterface;
    college?: {};
    slug?: string;
    injuries?: [];
    linked?: boolean;
    experience?: { [years:string]: number };
    collegeAthlete?: {};
    active?: boolean;
    eventLog?: {};
    draft?: DraftInterface;
    status?: StatusInterface;
}

interface BirthPlaceInterface {
    city?: string;
    state?: string;
    country?: string;
}

interface DraftInterface {
    displayText?: string,
    round?: number,
    year?: number,
    selection?: number
}

interface StatusInterface {
    id: string;
    name: string;
    type: string;
    abbreviation: string;
}

interface LinkInterface {
    href: URL;
    language?: string;
    rel?: Array<string>;
    text?: string;
    shortText?: string;
    isExternal?: boolean;
    isPremium?: boolean;
}