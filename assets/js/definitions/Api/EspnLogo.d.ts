import './Interface.Objects'
import {EspnLinkRel} from "./Interface.Objects";

interface EspnLogo {
  href: string
  width: number
  height: number
  alt: string
  rel: EspnLinkRel
  lastUpdated: string;
}

interface EspnLogos extends Array<EspnLogo> {}
