import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AdminMainPage } from '../admin/admin-main/admin-main';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { TeacherAttendancePage } from '../teacher/teacher-attendance/teacher-attendance';
import { StudentAttendancePage } from '../student/student-attendance/student-attendance';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  viewOtpSection: boolean= false;
  recaptchaVerifier: any;
   confirmMethod: any;
   userData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProfile: UserProfileProvider, public commonData: CommonProvider) {
    this.loginForm = new FormGroup({
      loginType: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      Otp: new FormControl(null),
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
    setTimeout(()=> {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }, 500);
  }

  login(formData){
    if(formData.valid){
      let searchByMob = '+91'+formData.value.mobileNo;
      console.log(formData.value, 'form value');
      firebase.database().ref(formData.value.loginType).orderByChild("mobileNo").equalTo(searchByMob).once('value', snapshot => {
        if (snapshot.exists()){
           var userSnapShot = snapshot.val();
           this.userData =  Object.keys(userSnapShot).map(key => userSnapShot[key]);
           this.userData[0]['loginType'] = formData.value.loginType;
           
         console.log("exists!", this.userData[0]);
         this.viewOtpSection = true;
          this.loginForm.get('Otp').setValidators([Validators.required]);
          this.loginForm.get('Otp').updateValueAndValidity();
          
          this.sendTokenOtp();
       }else {
         this.commonData.viewToast('Value does not exists');
       }
   })
    }
  }

  sendTokenOtp(){
    const phoneNumberString = '+91'+this.loginForm.get('mobileNo').value;
    firebase.auth().signInWithPhoneNumber(phoneNumberString,this.recaptchaVerifier).then((confirmationResult) => {
      console.log(confirmationResult, 'result');
      this.confirmMethod = confirmationResult;
      // this.verifyUser(this.confirmMethod)
    })
  };

  verifyUser(){
    if(this.confirmMethod){
      this.confirmMethod.confirm(this.loginForm.get('Otp').value).then((good)=> {
        localStorage.setItem('user', JSON.stringify(this.userData[0])); 
        this.userProfile.setUserProfile(this.userData[0]);
        if(this.userData && this.userData[0].loginType == 'adminData'){
          this.navCtrl.setRoot(AdminMainPage);
        }else if(this.userData && this.userData[0].loginType == 'teacherData'){
          this.navCtrl.setRoot(TeacherAttendancePage);
        }else if(this.userData && this.userData[0].loginType == 'studentData'){
          this.navCtrl.setRoot(StudentAttendancePage);
        }

      }).catch((bad)=> {
        console.log('bad verification');
        this.commonData.viewToast('Kindly add proper otp');
      })
    }
  }

  // verifyUser(formData){
  //   if(formData.valid){
  //     const appVerifier = this.recaptchaVerifier;
  //     const phoneNumberString = '+91'+formData.value.mobileNo;
   
  //     firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //       .then((confirmationResult) => {
  //         this.viewOtpSection = true;
  //         // this.sent = true;
  //         const verification = prompt('Enter verification code');
  //         if (verification != null) {
  //           console.log(verification);
  //           confirmationResult.confirm(verification)
  //             .then((good) => {
  //               // all checks out
  //             })
  //             .catch((bad) => {
  //               // code verification was bad.
  //             });
  //         } else {
  //           console.log('No verification code entered');
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('sms not sent', err);
  //       });
  //   }
  // }

}
