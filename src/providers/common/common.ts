import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  courseType: any;
  graduationYearList: any;
  subjectList: any;
  constructor(private toastCtrl: ToastController) {
  console.log('Hello CommonProvider Provider');    
  }

  getCourseType(){
    return this.courseType = [
      {
        name: "BSC-IT",
        value: "BSCIT",
      },
      {
        name: "BBI",
        value: "BBI",
      },
      {
        name: "BAF",
        value: "BAF",
      }
    ];
  }

  getGraduationList(){
    return this.graduationYearList = [
      {
        name: 'FY-BSC-IT',
        value: 'FYBSCIT',
        department: 'BSCIT',
      },
      {
        name: 'SY-BSC-IT',
        value: 'SYBSCIT',
        department: 'BSCIT',
      },
      {
        name: 'TY-BSC-IT',
        value: 'TYBSCIT',
        department: 'BSCIT',
      },
      {
        name: 'FY-BBI',
        value: 'FYBBI',
        department: 'BBI',
      },
      {
        name: 'SY-BBI',
        value: 'SYBBI',
        department: 'BBI',
      },
      {
        name: 'TY-BBI',
        value: 'TYBBI',
        department: 'BBI',
      },
      {
        name: 'FY-BAF',
        value: 'FYBAF',
        department: 'BAF',
      },
      {
        name: 'SY-BAF',
        value: 'SYBAF',
        department: 'BAF',
      },
      {
        name: 'TY-BAF',
        value: 'TYBAF',
        department: 'BAF',
      },

    ];
  }

  getSubjectList(){
    return this.subjectList = [
      // first year bsc-it
     {
      department: 'BSCIT',
      year: 'FYBSCIT',
      name:  'Imperative Programming',
      value: 'Imperative Programming'
     },
     {
      department: 'BSCIT',
      year: 'FYBSCIT',
      name:  'Digital Electronics',
      value: 'Digital Electronics'
     },
     {
      department: 'BSCIT',
      year: 'FYBSCIT',
      name:  'Operating System',
      value: 'Operating System'
     },
     {
      department: 'BSCIT',
      year: 'FYBSCIT',
      name:  'Discrete Mathematics',
      value: 'Discrete Mathematics'
     },
     {
      department: 'BSCIT',
      year: 'FYBSCIT',
      name:  'Communication Skills',
      value: 'Communication Skills'
     },

    //  second year bscit
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Python',
      value: 'Python'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Database Management System',
      value: 'Database Management System'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Applied Mathematics-2',
      value: 'Applied Mathematics-2'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Computer Networks',
      value: 'Computer Networks'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Data Structures and algorithms',
      value: 'Data Structures and algorithms'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Core Java',
      value: 'Core Java'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Embedded Systems',
      value: 'Embedded Systems'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Computer Oriented Statistics Techniques',
      value: 'Computer Oriented Statistics Techniques'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Software Engineering',
      value: 'Software Engineering'
     },
    {
      department: 'BSCIT',
      year: 'SYBSCIT',
      name:  'Computer Graphics',
      value: 'Computer Graphics'
     },

    //  third year bsc-it
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Enterprise Java',
      value: 'Enterprise Java'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'IOT',
      value: 'IOT'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Advanced Web Programming',
      value: 'Advanced Web Programming'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Software Project Management',
      value: 'Software Project Management'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Artificial Intelligence',
      value: 'Artificial Intelligence'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Business Intelligence',
      value: 'Business Intelligence'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Security in computing',
      value: 'Security in computing'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Software quality assurance',
      value: 'Software quality assurance'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Geographic Information System',
      value: 'Geographic Information System'
     },
    {
      department: 'BSCIT',
      year: 'TYBSCIT',
      name:  'Cyber Law',
      value: 'Cyber Law'
     },

    ];
  }


  viewToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'ok'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
