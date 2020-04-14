import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminTeacherPage } from '../admin-teacher/admin-teacher'
import { AdminStudentPage } from '../admin-student/admin-student'
import { FilterPage } from '../../filter/filter';

/**
 * Generated class for the AdminMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-main',
  templateUrl: 'admin-main.html',
})
export class AdminMainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMainPage');
  }

  viewPage(type){
    if(type == 'teacher'){
      this.navCtrl.push(AdminTeacherPage);
    }else if(type == 'student'){
      this.navCtrl.push(AdminStudentPage);
    }else if(type == 'filterPage'){
      this.navCtrl.push(FilterPage)
    }
  }

}
