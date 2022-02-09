import { EspnLogos } from "./EspnLogo";

interface EspnGroupType {
  id: string
  parent: EspnGroupType
  isConference: boolean
}

interface EspnLinkRel extends Array<string> {}

interface EspnLinks extends Array<EspnLink> {}

interface EspnLink {
  language: 'en-US'
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
}

interface EspnImage {
  href: string;
  alt?: string;
  width?: number;
  height?: number;
  rel?: string;
}

interface EspnBirthPlace {
  city?: string;
  state?: string;
  country?: string;
}

interface EspnDraft {
  displayText?: string,
  round?: number,
  year?: number,
  selection?: number
}

interface EspnStatus {
  id: string;
  name: string;
  type: string;
  abbreviation: string;
}