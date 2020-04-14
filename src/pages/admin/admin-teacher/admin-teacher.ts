import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminTeacherFormPage } from '../admin-teacher-form/admin-teacher-form';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CommonProvider } from '../../../providers/common/common';
/**
 * Generated class for the AdminTeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-teacher',
  templateUrl: 'admin-teacher.html',
})
export class AdminTeacherPage {
  teacherList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public commonData: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTeacherPage');
    this.getTeacherData();
  }

  viewDetailPage(){
    this.navCtrl.push(AdminTeacherFormPage);
  }

  getTeacherData(){
    firebase.database().ref('teacherData').once('value', snapshot => {
      if (snapshot.exists()){
         var teacherDataSnapShot = snapshot.val();
         var userData =  Object.keys(teacherDataSnapShot).map(key => teacherDataSnapShot[key])
        this.teacherList = userData;
        console.log(this.teacherList, 'teacher list');
     }else {
        this.commonData.viewToast('Value does not exists');
     }
    })
  }

  editData(data){
    if(data){
      data.type = 'edit';
      this.navCtrl.push(AdminTeacherFormPage,data);
    }
  }

  deleteData(data, index){
    if(data){
      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Do you want to delete this user?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              // console.log('Buy clicked');
              this.confirmDelete(data, index);
            }
          }
        ]
      });
      alert.present();
    }
  }

    confirmDelete(data, index){
      firebase.database().ref('teacherData').orderByChild('mobileNo').equalTo(data.mobileNo).once('value', snapShot => {
        if(snapShot.exists()){
          let key = Object.keys(snapShot.val())[0];
          if(key){
            firebase.database().ref('teacherData').child(key).remove().then(data => {
              this.commonData.viewToast('Data deleted successfully');
              this.teacherList.splice(index,1);
            }, error => {
              this.commonData.viewToast('Something went wrong');
            });
          }
        }else {
          this.commonData.viewToast('Something went wrong');
        }
      })
    }

}
