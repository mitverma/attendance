import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login'
import { StudentAttendancePage } from '../pages/student/student-attendance/student-attendance';
import { UserProfileProvider } from '../providers/user-profile/user-profile';
import { AdminMainPage } from '../pages/admin/admin-main/admin-main';

import * as firebase from 'firebase';
import { TeacherAttendancePage } from '../pages/teacher/teacher-attendance/teacher-attendance';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userProfile: UserProfileProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      { title: 'My Profile', component: ListPage },
      // { title: 'Login', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(localStorage.getItem('user')){
        let userData = JSON.parse(localStorage.getItem('user'));
        this.userProfile.setUserProfile(userData);
        if(userData.loginType == 'adminData'){
          this.nav.setRoot(AdminMainPage);
        }else if(userData.loginType == 'teacherData'){
          this.nav.setRoot(TeacherAttendancePage);
        }else if(userData.loginType == 'studentData'){
          this.nav.setRoot(StudentAttendancePage);
        }
      }else {
        // this.nav.setRoot(LoginPage);
        this.nav.setRoot(AdminMainPage);
      }
          
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }

  logout(){
    localStorage.removeItem('user');
    this.userProfile.setUserProfile(null);
    this.nav.setRoot(LoginPage);
  }

  
}
