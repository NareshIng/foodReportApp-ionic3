import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FoodDetailDataProvider } from "../../providers/food-detail-data/food-detail-data";

import { AppUtility } from "../../shared/utils/app-utility/app-utility";
/**
 * Generated class for the FoodDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-food-detail",
	templateUrl: "food-detail.html"
})
export class FoodDetailPage {
	foodItem = {};
	foodDetailsObj = {};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public FoodDetailDataProvider: FoodDetailDataProvider,
		public AppUtility: AppUtility
	) {
		this.foodItem = navParams.get("item");
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad FoodDetailPage");
		this.AppUtility.showLoadingMask(() => {
			//this.doApiCall(() => {});
		});
	}

	// make provider call
	doApiCall(successCb?: Function, errorCb?: Function, finalCb?: Function) {
		this.FoodDetailDataProvider.getFoodDetailsBaseUrl(
			this.foodItem.id
		).subscribe(
			data => {
				this.foodDetailsObj = data.food;
				if (successCb) {
					successCb();
				}
			},
			error => {
				this.AppUtility.log("something went wrong");
				if (errorCb) {
					errorCb();
				}
			},
			() => {
				if (finalCb) {
					finalCb();
				}
			}
		);
	}
}
