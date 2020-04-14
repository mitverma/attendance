import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { UserProfileProvider } from '../../../providers/user-profile/user-profile';
import { CommonProvider } from '../../../providers/common/common';
import moment from 'moment';
import { FilterPage } from '../../filter/filter';
/**
 * Generated class for the TeacherAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-attendance',
  templateUrl: 'teacher-attendance.html',
})
export class TeacherAttendancePage {
  teacherAttendance: FormGroup;
  courseType: any = [];
  todayDate: any;
  minSelectedTime: any;
  viewCode: any;
  getAllSubjectList: any;
  subjectList: any;
  userData: any;
  getMinEndDate: any;
  setEndTime: any;
  lectureInterval: any;
  disableBtn: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProfile: UserProfileProvider, public commonData: CommonProvider) {
    this.todayDate = new Date().toJSON().split('T')[0];
    this.minSelectedTime = moment().format('HH:mm');
    console.log(this.todayDate, 'today date time');
    this.getMinEndDate = moment().format('hh:mm').toString();
    this.setEndTime = moment().add('45', 'minutes').format('HH:mm');
    console.log(this.getMinEndDate, 'end time min', this.setEndTime, 'set end time', moment(), 'moment');

    console.log(moment.utc(moment(this.setEndTime, "HH:mm").diff(moment(this.minSelectedTime, "HH:mm"))).format("mm"), 'difference');

    // let value = this.minSelectedTime.diff(this.setEndTime, 'minutes');
    // console.log(value, 'difference');

    this.teacherAttendance = new FormGroup({
      date: new FormControl({value: this.todayDate, disabled: true}, [Validators.required]),
      startTime: new FormControl({value: this.minSelectedTime, disabled: true}, [Validators.required]),
      endTime: new FormControl(this.setEndTime, [Validators.required]),
      department: new FormControl({value: '', disabled: true}),
      batchYear: new FormControl('', [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
    });

    this.courseType = [
      {
        name: 'FY-BSCIT',
        value: 'FYBSCIT'
      },
      {
        name: 'SY-BSCIT',
        value: 'SYBSCIT'
      },
      {
        name: 'TY-BSCIT',
        value: 'TYBSCIT'
      },
    ]
  }

  ionViewDidLoad() {
    console.log(Math.floor(100000 + Math.random() * 900000));
    console.log('ionViewDidLoad TeacherAttendancePage');

    // this.viewCode = Math.floor(100000 + Math.random() * 900000);

    this.userData = this.userProfile.getUserProfile();
    this.teacherAttendance.patchValue({
      department: this.userData.department
    });
    if(this.userData && this.userData.department){
      let getAllCourses = this.commonData.getGraduationList();
      this.courseType = getAllCourses.filter(list => {
        if(list.department == this.userData.department){
          return list;
        }
      });
      console.log(this.courseType, 'courseType');
    }

    


    // get alll subjects
    this.getAllSubjectList = this.commonData.getSubjectList();
    console.log(this.getAllSubjectList, 'get all subject list');
    
  }

  markAttendance(formData){
    if(formData.valid){
      let selectedValue = formData.getRawValue();
      let generateCode = Math.floor(100000 + Math.random() * 900000);
      firebase.database().ref('teacherAttendance').orderByChild("uniquecode").equalTo(generateCode).once('value', snapshot=>{
        if(snapshot.exists()){

        }else {
          firebase.database().ref('teacherAttendance').push({
            department: this.userData.department,
            date: selectedValue.date,
            startTime: selectedValue.startTime,
            endTime: selectedValue.endTime,
            batchYear: selectedValue.batchYear,
            subject: selectedValue.subject,
            code: generateCode.toString(),
            facultyName: this.userData ? this.userData.fullName: '',
            mobileNo: this.userData ? this.userData.mobileNo : ''
          }).then(data=>{
            this.commonData.viewToast('Lecture Started');
            this.viewCode = generateCode;
            this.teacherAttendance.patchValue({
              batchYear: '',
              subject: ''
            });


            this.startLecture('','');

          })
        }
      })
    }
  }


  // on select change
  onSelectChange(event: any){
    console.log(event, 'event');
    if(event && this.userData && this.userData.department){
      this.subjectList = this.getAllSubjectList.filter(list => {
        if(list.department == this.userData.department && list.year == event){
          return list;
        }
      })
    }
  }

  startLecture(min, sec){
    this.disableBtn = true;
    let count = 0;
    this.lectureInterval = setInterval(()=>{
      count++;
      if(count >= 3000) {
        this.disableBtn = false;
        clearInterval(this.lectureInterval);
      }
    },3000);
    
  }

  viewValue(){
    console.log(this.teacherAttendance.get('endTime').value, 'value');
    console.log(moment.utc(moment(this.teacherAttendance.get('endTime').value, "HH:mm").diff(moment(this.minSelectedTime, "HH:mm"))).format("mm"), 'change baby')
    console.log(moment.utc(moment(this.teacherAttendance.get('endTime').value, "HH:mm").diff(moment(this.minSelectedTime, "HH:mm"))).format("hh"), 'change baby')
  }

  viewAttendance(){
    let paramsData = {
      code: this.viewCode ? this.viewCode : '',
      type: 'ViewByCode'
    }
    this.navCtrl.push(FilterPage,paramsData);
  }

}
