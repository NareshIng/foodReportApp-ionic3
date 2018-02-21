import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AppConfigs } from "../../shared/configs/app-configs/app-configs";

/*
  Generated class for the FoodDetailDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodDetailDataProvider {
	data: any;
	constructor(public http: Http, public AppConfigs: AppConfigs) {
		console.log("Hello FoodDetailDataProvider Provider");
	}

	getFoodDetail(item) {
		return this.http
			.get(this.AppConfigs.getFoodDetailsBaseUrl(item.id))
			.map(res => res.json());
	}
}
