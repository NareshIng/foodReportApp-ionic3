import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { MyApp } from "./app.component";
import { FoodListPage } from "../pages/food-list/food-list";
import { FoodDetailPage } from "../pages/food-detail/food-detail";
import { FoodListDataProvider } from "../providers/food-list-data/food-list-data";

import { AppUtility } from "../shared/utils/app-utility/app-utility";
import { AppConfigs } from "../shared/configs/app-configs/app-configs";
import { FoodDetailDataProvider } from '../providers/food-detail-data/food-detail-data';

@NgModule({
  declarations: [MyApp, FoodListPage, FoodDetailPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, FoodListPage, FoodDetailPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FoodListDataProvider,
    AppUtility,
    AppConfigs,
    FoodDetailDataProvider
  ]
})
export class AppModule {}
