import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AdminStudentFormPage } from '../admin-student-form/admin-student-form'
import * as firebase from 'firebase';
import { CommonProvider } from '../../../providers/common/common';
/**
 * Generated class for the AdminStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-student',
  templateUrl: 'admin-student.html',
})
export class AdminStudentPage {
  studentList: any[];  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public commonData: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStudentPage');
    this.getStudentData();
  }

  getStudentData(){
    firebase.database().ref('studentData').once('value', snapshot => {
      if (snapshot.exists()){
         var studentDataSnapShot = snapshot.val();
         var userData =  Object.keys(studentDataSnapShot).map(key => studentDataSnapShot[key]);
        this.studentList = userData;
     }else {
       this.commonData.viewToast('Value does not exists');
     }
    })
  }

  viewDetailPage(){
    this.navCtrl.push(AdminStudentFormPage)
  }


  editData(data){
    if(data){
      data.type = 'edit';
      this.navCtrl.push(AdminStudentFormPage,data);
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
      firebase.database().ref('studentData').orderByChild('mobileNo').equalTo(data.mobileNo).once('value', snapShot => {
        if(snapShot.exists()){
          let key = Object.keys(snapShot.val())[0];
          if(key){
            firebase.database().ref('studentData').child(key).remove().then(data => {
              this.commonData.viewToast('Data deleted successfully');
              this.studentList.splice(index,1)
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
