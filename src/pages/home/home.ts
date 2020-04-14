import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recaptchaVerifier: any;
  phone_number: any;
  adminAdd: FormGroup;
  constructor(public navCtrl: NavController) {
    this.adminAdd = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required])
    })
  }
  
  ionViewDidLoad(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  }
  
  onSubmit(formData) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = formData.phone_number.toString();
 
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then((confirmationResult) => {
        // this.sent = true;
        const verification = prompt('Enter verification code');
        if (verification != null) {
          console.log(verification);
          confirmationResult.confirm(verification)
            .then((good) => {
              // all checks out
            })
            .catch((bad) => {
              // code verification was bad.
            });
        } else {
          console.log('No verification code entered');
        }
      })
      .catch((err) => {
        console.log('sms not sent', err);
      });
  };

  addAdmin(formData){
    if(formData.valid){
      firebase.database().ref('adminData').push({
        createdDate: new Date().valueOf(),
        fullName: formData.value.name,
        mobileNo: '+91'+formData.value.mobileNo,
        department: 'Admin',
        address: ''
      }).then(data=>{
        console.log(data, 'data');
      })
    }
  }
}
