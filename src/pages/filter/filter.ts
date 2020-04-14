import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  viewFilterByCode: boolean = false;
  studentListByCode: any = [];
  viewSlide: boolean = false;
  courseType: any = [];
  allGradutionList: any = [];
  filterForm: FormGroup;
  teacherAttendanceList: any;
  studentAttendanceList: any;
  viewFilteredList: any = [];
  typeFiltered: any = 'Student';
  constructor(public navCtrl: NavController, public navParams: NavParams, public commonData: CommonProvider) {
    this.filterForm = new FormGroup({
      type: new FormControl('studentAttendance'),
      department: new FormControl(''),
      batchYear: new FormControl(null),
      date: new FormControl(null)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
    if(this.navParams && this.navParams.data && this.navParams.data.type == 'ViewByCode' && this.navParams.data.code) {
      this.viewFilterByCode = true;
      this.viewAttendanceByCode(this.navParams.data.code);
    }


    // get all gradution list
    this.allGradutionList = this.commonData.getGraduationList();


    // apply filter at start
      this.getStudentAdnList();
      this.getTeacherAdnList();

  }


  // view attendance by code
  viewAttendanceByCode(code){
    if(code){
      firebase.database().ref('studentAttendance').orderByChild('uniqueCode').equalTo(code).once('value', snapshot => {
        if(snapshot.exists()){
          let studentSnapShot = snapshot.val();
          let studentData =  Object.keys(studentSnapShot).map(key => studentSnapShot[key])
         this.studentListByCode = studentData;
         console.log(this.studentListByCode, 'student list by code');
        }else {
        }
      })
    }
  }

  viewFilter(){
    this.viewSlide = true;
    
  }

  close(){
    this.viewSlide = false;
  }

  selectDepartment(event){
    if(event && this.allGradutionList.length){
      console.log(event, 'event');
      this.courseType = this.allGradutionList.filter(list => {
        if(list.department == event){
          return list;
        }
      })
    }
  }

  getStudentAdnList(){
    firebase.database().ref('studentAttendance').once('value', snapShot => {
      if(snapShot){
        var studentSnapShot = snapShot.val();
        this.studentAttendanceList =  Object.keys(studentSnapShot).map(key => studentSnapShot[key]);   
        
        // delete if not needed default
        this.viewFilteredList = this.studentAttendanceList;
        console.log(this.viewFilteredList, 'list attendance');
      }
    })
  }


  getTeacherAdnList(){
    firebase.database().ref('teacherAttendance').once('value', snapShot => {
      if(snapShot){
        var teacherSnapShot = snapShot.val();
        this.teacherAttendanceList =  Object.keys(teacherSnapShot).map(key => teacherSnapShot[key]);    
        console.log(this.teacherAttendanceList, 'teacher list');
      }
    })
  }

  applyFilter(formData){
    if(formData){
      let formValue = formData.value;
      console.log(formValue, 'list');
      if(formValue.type == "studentAttendance"){
        this.typeFiltered = 'Student';

        this.viewFilteredList = this.studentAttendanceList.filter(list => {
          if(formValue.type && formValue.department == null && formValue.batchYear == null){
            return list;
          }else if(formValue.department && formValue.department != '' && formValue.batchYear == null){
            return list.department == formValue.department;
          }else if(formValue.department && formValue.batchYear){
            return (list.department == formValue.department && list.batchYear == formValue.batchYear);
          }

        });
        console.log(this.viewFilteredList, 'filtered');

      }else if(formValue.type == "teacherAttendance"){
        this.typeFiltered = 'Teacher';


        this.viewFilteredList = this.teacherAttendanceList.filter(list => {
          if(formValue.type && formValue.department == null && formValue.batchYear == null){
            return list;
          }else if(formValue.department && formValue.department != '' && formValue.batchYear == null){
            return list.department == formValue.department;
          }else if(formValue.department && formValue.batchYear){
            return (list.department == formValue.department && list.batchYear == formValue.batchYear);
          }

        });
      }

      this.close();
    }
  }


  typeChange(event){
    if(event){
      this.filterForm.patchValue({
        department: null,
        batchYear: null,
      })
    }
    
  }
  
 

}
