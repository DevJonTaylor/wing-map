import {EspnLogos} from "./EspnLogo";

interface EspnNFLFranchise {
  $ref: string
  id: string
  uid: string
  slug: string
  location: string
  name: string
  nickname: string
  abbreviation: string
  displayName: string
  shortDisplayName: string
  color: string
  isActive: string
  logos: EspnLogos
}