import { Injectable } from '@angular/core';

/*
  Generated class for the UserProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileProvider {
  userData: any;
  constructor() {
    console.log('Hello UserProfileProvider Provider');
  }

  getUserProfile(){
    return this.userData;
  }

  setUserProfile(data){
    return this.userData = data;
  }
}
