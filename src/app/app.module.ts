import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AdminMainPage } from '../pages/admin/admin-main/admin-main';
import { AdminStudentPage } from '../pages/admin/admin-student/admin-student';
import { AdminTeacherPage } from '../pages/admin/admin-teacher/admin-teacher';
import { AdminStudentFormPage } from '../pages/admin/admin-student-form/admin-student-form';
import { AdminTeacherFormPage } from '../pages/admin/admin-teacher-form/admin-teacher-form';
import { TeacherAttendancePage } from '../pages/teacher/teacher-attendance/teacher-attendance';
import { StudentAttendancePage } from '../pages/student/student-attendance/student-attendance';
import { FilterPage } from '../pages/filter/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileProvider } from '../providers/user-profile/user-profile';
import { CommonProvider } from '../providers/common/common';

const config = {
  apiKey: "AIzaSyAbY3XIEA90WWyG1vo7hXXm9Gj6ZNOuOpU",
  authDomain: "attendanceapp-705bf.firebaseapp.com",
  databaseURL: "https://attendanceapp-705bf.firebaseio.com",
  projectId: "attendanceapp-705bf",
  storageBucket: "attendanceapp-705bf.appspot.com",
  messagingSenderId: "754770674418",
  appId: "1:754770674418:web:1b1630be56a82ae027066b",
  measurementId: "G-BLMR9M0ESH"
}

firebase.initializeApp(config);
console.log(firebase, 'firebase');

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AdminMainPage,
    AdminStudentPage,
    AdminTeacherPage,
    AdminStudentFormPage,
    AdminTeacherFormPage,
    TeacherAttendancePage,
    StudentAttendancePage,
    FilterPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AdminMainPage,
    AdminStudentPage,
    AdminTeacherPage,
    AdminStudentFormPage,
    AdminTeacherFormPage,
    TeacherAttendancePage,
    StudentAttendancePage,
    FilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProfileProvider,
    CommonProvider
  ]
})
export class AppModule {}