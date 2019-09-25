export class SiteDetails {
  siteID: string;
  siteName: string;
  ownership: string;
  ownerSiteName: string;
  frequencyBand: string;
  commissionedDate: string;
  commissionedDate3G: string;
  // Location Details
  latitude: number;
  longitude: number;
  subRegion: string;
  address: string;
  altitude: number;
  towerType: string;
  towerHeight: number;
  buildingHeight: number;
  // Cellular Antenna Location Details
  heightInTower: string;
  sector1Direction: number;
  sector2Direction: number;
  sector3Direction: number;
  sector1HBW: number;
  sector2HBW: number;
  sector3HBW: number;
  sector1Tilt2g: string;
  sector2Tilt2g: string;
  sector3Tilt2g: string;
  sector1Tilt3g: string;
  sector2Tilt3g: string;
  sector3Tilt3g: string;
  // Cellular Antenna Type Details
  bandType: string;
  antProdName3g: string;
  antHBW3g: number;
  antModel3g: string;
  antQty3g: number;
  bisectorAntSectorNo3G: string;
  antHBW2g: number;
  antModel2g: string;
  antQty2g900: number;
  antQty2g1800: number;
  totalAntQty: number;
  // BSC RNC Details
  bsc: string;
  rnc: number;
  btsType: string;
  btsModel: string;
  trxType2g: string;
  // Cabin Details
  equipmentType: string;
  shelterType: string;
  shelterSize: string;
  accessoriesInShelter: string;
}
