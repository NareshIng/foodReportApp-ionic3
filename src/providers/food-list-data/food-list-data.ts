import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AppConfigs } from "../../shared/configs/app-configs/app-configs";

/*
  Generated class for the FoodListDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodListDataProvider {
	data: any;
	constructor(public http: Http, public AppConfigs: AppConfigs) {
		console.log("Hello FoodListDataProvider Provider");
	}

	getFoodList() {
		return this.http
			.get(this.AppConfigs.getFoodListBaseUrl())
			.map(res => res.json());
	}
}
