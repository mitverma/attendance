import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { CommonProvider } from '../../../providers/common/common';
import { UserProfileProvider } from '../../../providers/user-profile/user-profile';

/**
 * Generated class for the StudentAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-attendance',
  templateUrl: 'student-attendance.html',
})
export class StudentAttendancePage {
  studentAttendance: FormGroup;
  userProfileData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public commonData: CommonProvider, public userProfile: UserProfileProvider) {
    this.studentAttendance = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      department: new FormControl(null),
      batchYear: new FormControl(null),
      subject: new FormControl(null),
      mobileNo: new FormControl(null),
      uniqueCode: new FormControl(null, [Validators.required]),
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentAttendancePage');
    this.userProfileData = this.userProfile.getUserProfile();
  }

  markAttendance(formData){
    if(formData.valid){
      firebase.database().ref('teacherAttendance').orderByChild('code').equalTo(formData.value.uniqueCode).once('value', snapShot => {
        if(snapShot.exists()){
          var codeSnapShot = snapShot.val();
          var userData =  Object.keys(codeSnapShot).map(key => codeSnapShot[key]);
          console.log(userData[0], 'userdata');

          firebase.database().ref('studentAttendance').push({
            fullName: this.userProfileData.fullName || formData.value.fullName,
            mobileNo: this.userProfileData.mobileNo || formData.value.mobileNo,
            department: this.userProfileData.department || formData.value.department,
            batchYear: userData[0].batchYear,
            subject: userData[0].subject,
            uniqueCode: formData.value.uniqueCode,
            date: userData[0].date,
            startTime: userData[0].startTime,
            endTime: userData[0].endTime,
            facultyName: userData[0].facultyName,
            facultyMobileNo: userData[0].mobileNo
          }).then(data => {
            console.log(data, 'data');
            this.commonData.viewToast('Attendance marked sucessfully');
            this.studentAttendance.reset();
          })
        }else {
          this.commonData.viewToast('Wrong Passcode');
        }
      });
    }
  }

}
