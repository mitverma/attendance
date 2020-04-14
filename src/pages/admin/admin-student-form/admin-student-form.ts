import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonProvider } from '../../../providers/common/common';

/**
 * Generated class for the AdminStudentFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-student-form',
  templateUrl: 'admin-student-form.html',
})
export class AdminStudentFormPage {
  studentFormData: FormGroup;
  selectOptions: any;
  isEdit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public commonData:CommonProvider) {
    this.studentFormData  = new FormGroup({
      createdDate: new FormControl(null),
      fullName: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
    });

    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminStudentFormPage');
    console.log(this.navParams, 'nav params');

    if(this.navParams && this.navParams.data && this.navParams.data.mobileNo){
      let data = this.navParams.data;
      data.mobileNo = data.mobileNo.replace('+91', '');
      this.isEdit = true;
      this.studentFormData.patchValue({
        createdDate: data.createdDate,
        fullName: data.fullName,
        mobileNo: data.mobileNo,
        department: data.department,
        address: data.address
      });
    }
  }



  submitStudentData(formData){
    if(formData.valid){
      let searchByMob = '+91'+formData.value.mobileNo;
      firebase.database().ref('studentData').orderByChild("mobileNo").equalTo(searchByMob).once('value', snapshot => {
        if(snapshot.exists()){
          this.commonData.viewToast('Student data already exists');
        }else {          
          firebase.database().ref('studentData').push({
            createdDate: new Date().valueOf(),
            fullName: formData.value.fullName,
            mobileNo: '+91'+formData.value.mobileNo,
            department: formData.value.department,
            address: formData.value.address,
          }).then((data)=> {
            console.log(data, 'data');
            this.commonData.viewToast('Student data added succesfully');
            this.navCtrl.pop();
          });
        }
      })

    }
  }


  saveChanges(formData){
    if(formData.valid){
      let searchByMob = '+91'+formData.value.mobileNo;
      firebase.database().ref('studentData').orderByChild("mobileNo").equalTo(searchByMob).once('value', snapshot => {
        if(snapshot.exists()){
          let key = Object.keys(snapshot.val())[0];
          console.log(key, 'key');
          if(key){
            firebase.database().ref('studentData').child(key).update({
              createdDate: formData.value.createdDate,
              fullName: formData.value.fullName,
              mobileNo: '+91'+formData.value.mobileNo,
              department: formData.value.department,
              address: formData.value.address,
            }).then(data => {
                this.commonData.viewToast('Data saved successfully');
                this.navCtrl.pop();
            }, error => {
              this.commonData.viewToast('Something went wrong');
            })
          }
        
        }else {          
        
        }
      })
    }
  }
}
