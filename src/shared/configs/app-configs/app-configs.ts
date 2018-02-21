import { Injectable } from "@angular/core";
import * as _ from "lodash";
/*
  Generated class for the AppConfigs provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConfigs {
	base_url = "https://api.nal.usda.gov/ndb";
	constructor() {
		console.log("Hello AppConfigsProvider Provider");
	}
	/*
	* TODO: take params and serialize to URL
	*/
	public getFoodListBaseUrl(): string {
		//return this.base_url+"/list?format=json&lt=f&sort=n&api_key=DEMO_KEY";
		let dev_url = "assets/data/food-list.json";
		return dev_url;
	}

	public getFoodDetailsBaseUrl(id: string): string {
		//return "https://api.nal.usda.gov/ndb/reports/?type=b&api_key=DEMO_KEY&ndbno="+id;
		//45137745
		let dev_url = "assets/data/food-details.json";
		return dev_url;
	}
}
