import { AssetLocation } from "./location";

export class Asset {
  assetID?: number;
  name: string = "";
  type: string = "";
  installationDate: string = "";
  status: string = "Active";
  locations: AssetLocation[] = []; 
}
