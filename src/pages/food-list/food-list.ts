import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";
import * as _ from "lodash";
import { Storage } from "@ionic/storage";
import { FoodListDataProvider } from "../../providers/food-list-data/food-list-data";
import { FoodDetailPage } from "../food-detail/food-detail";

import { AppUtility } from "../../shared/utils/app-utility/app-utility";

@Component({
  selector: "page-food-list",
  templateUrl: "food-list.html"
})
export class FoodListPage {
  //selectedItem: any;
  defaultFoodListView: string = "all";

  foodList: Array<{ id: string; name: string; offset: string }>;
  favFoodList: Array<{ id: string; name: string; offset: string }> = [];
  foodListClone: Array<{ id: string; name: string; offset: string }>;
  favFoodListClone: Array<{ id: string; name: string; offset: string }>;
  storedfavFoodList: Array<{ id: string; name: string; offset: string }>;
  searchQuery: string = "";

  @ViewChild("content") content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public FoodListDataProvider: FoodListDataProvider,
    public AppUtility: AppUtility
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get("item");
  }

  ionViewDidLoad() {
    //this.AppUtility.log('ionViewDidLoad CoinsListPage');

    this.AppUtility.showLoadingMask(() => {
      this.doApiCall(() => {
        this.foodListClone = this.foodList;
      });
    });
  }

  // make provider call
  doApiCall(successCb?: Function, errorCb?: Function, finalCb?: Function) {
    this.FoodListDataProvider.getFoodList().subscribe(
      data => {
        this.foodList = data.list.item;
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

  // search bar list filtering
  doFilter(event): void {
    var input = this.searchQuery.toLowerCase();

    this.foodList = _.filter(this.foodListClone, function(item): boolean {
      var name = item.name.toLowerCase();
      return name.indexOf(input) > -1;
    });
  }

  // cancel search
  onSearchCancel(): void {
    this.foodList = this.foodListClone;
  }

  // show/hide search bar
  doToggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
    this.content.resize();
  }

  // segement switch event
  FoodListViewChanged(val: string): void {
    if (val === "fav") {
      this.getfavFoodListFromStorage().then(favFoodListArr => {
        if (favFoodListArr && favFoodListArr.length) {
          _.forEach(favFoodListArr, id => {
            let itemObj = this.getFullObjectFromId(id);
            this.favFoodList.push(itemObj);
          });
        }
      });
    }
  }

  // returns item object from id
  getFullObjectFromId(id: string): any {
    return _.find(this.foodListClone, ["id", id]);
  }

  // retrieve symbols
  getfavFoodListFromStorage(): any {
    let favStorage = this.storage.get("favFoodList");
    favStorage.then(favFoodListArr => {
      if (favFoodListArr && favFoodListArr.length) {
        this.storedfavFoodList = favFoodListArr;
      }
    });

    return favStorage;
  }

  // add/remove to/from fav
  toggleFavorite(item: any): void {
    this.getfavFoodListFromStorage().then(favFoodList => {
      console.log("hi" + favFoodList);

      if (!(favFoodList && favFoodList.length)) {
        // add to favorites
        favFoodList = [];

        favFoodList.push(item.id);
        console.log(favFoodList);
        this.setfavFoodListToStorage(favFoodList);
      } else {
        if (_.includes(favFoodList, item.id)) {
          this.doRemoveFromFavorites(item.id);
        } else {
          favFoodList.push(item.id);
          this.setfavFoodListToStorage(favFoodList);
        }
      }
    });
  }

  // remove from favorites
  doRemoveFromFavorites(id: string) {
    this.getfavFoodListFromStorage().then(favFoodListArr => {
      if (favFoodListArr && favFoodListArr.length) {
        _.remove(favFoodListArr, i => {
          return i === id;
        });
        console.log(favFoodListArr);
        this.setfavFoodListToStorage(favFoodListArr).then(favFoodListArr => {
          this.FoodListViewChanged("fav");
        });
      }
    });
  }

  // store
  setfavFoodListToStorage(favFoodList: any): any {
    return this.storage.set("favFoodList", favFoodList);
  }

  // returns if item is in favs
  isItemInFavs(item, checkFromStorage: boolean): boolean {
    if (checkFromStorage) {
      /*this.getfavFoodListFromStorage().then(favFoodListArr => {
        if (favFoodListArr && favFoodListArr.length) {
          this.AppUtility.log(favFoodListArr);
          return _.includes(favFoodListArr, symbol);
        }
      });*/
    } else {
      return _.includes(this.storedfavFoodList, item);
    }
  }

  // go to details page
  onItemTap(event, item) {
    this.navCtrl.push(FoodDetailPage, {
      item: item
    });
  }
}
