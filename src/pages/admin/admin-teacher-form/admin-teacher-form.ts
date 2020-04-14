import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { CommonProvider } from '../../../providers/common/common';

/**
 * Generated class for the AdminTeacherFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-teacher-form',
  templateUrl: 'admin-teacher-form.html',
})
export class AdminTeacherFormPage {
  teacherFormData: FormGroup;
  selectOptions: any;
  isEdit: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public commonData:CommonProvider) {
    this.teacherFormData  = new FormGroup({
      createdDate: new FormControl(null),
      fullName: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
    });

    this.selectOptions = {
      title: 'Select Department',
      // subTitle: 'Select your toppings',
      mode: 'md'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTeacherFormPage');
    console.log(this.navParams, 'params');
    if(this.navParams && this.navParams.data && this.navParams.data.mobileNo){
      let data = this.navParams.data;
      data.mobileNo = data.mobileNo.replace('+91', '');
      this.isEdit = true;
      this.teacherFormData.patchValue({
        createdDate: data.createdDate,
        fullName: data.fullName,
        mobileNo: data.mobileNo,
        department: data.department,
        address: data.address
      });
    }
  }
  
  submitTeacherData(formData){
    if(formData.valid){
      let searchByMob = '+91'+formData.value.mobileNo;
      firebase.database().ref('teacherData').orderByChild("mobileNo").equalTo(searchByMob).once('value', snapshot => {
        if(snapshot.exists()){
          this.commonData.viewToast('Teacher data already exists');
        }else {          
          firebase.database().ref('teacherData').push({
            createdDate: new Date().valueOf(),
            fullName: formData.value.fullName,
            mobileNo: '+91'+formData.value.mobileNo,
            department: formData.value.department,
            address: formData.value.address,
          }).then((data)=> {
            console.log(data, 'data');
            this.commonData.viewToast('Teacher data added succesfully');
            this.navCtrl.pop();
          });
        }
      })

    }
  }

  saveChanges(formData){
    if(formData.valid){
      let searchByMob = '+91'+formData.value.mobileNo;
      firebase.database().ref('teacherData').orderByChild("mobileNo").equalTo(searchByMob).once('value', snapshot => {
        if(snapshot.exists()){
          let key = Object.keys(snapshot.val())[0];
          console.log(key, 'key');
          if(key){
            firebase.database().ref('teacherData').child(key).update({
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
