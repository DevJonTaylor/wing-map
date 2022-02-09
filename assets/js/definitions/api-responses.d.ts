interface EspnObject {
    id: string;
    uid?: string;
    guid?: string;
}

interface EspnPerson extends EspnObject {
    firstName: string;
    lastName: string;
    displayName: string;
    fullName: string;
    shortName: string;
    headshot?: EspnImageInterface | Array<EspnImageInterface>;
    links: Array<EspnLinkInterface>;
    weight?: number;
    displayWeight?: string;
    height?: number;
    displayHeight?: string;
    age?: number;
    dateOfBirth?: string;
    debutYear?: number;
    birthPlace?: BirthPlaceInterface;
    college?: {};
    slug?: string;
    injuries?: [];
    linked?: boolean;
    experience?: { [years:string]: number };
}

interface EspnAthlete extends EspnPerson {
    jersey: string;
    position: EspnPositionInterface;
    collegeAthlete?: {};
    active?: boolean;
    eventLog?: {};
    draft?: DraftInterface;
    status?: StatusInterface;
}

interface EspnThing extends EspnObject {
    name: string;
    displayName: string;
    abbreviation: string;
}

interface EspnPositionInterface extends EspnThing {}


