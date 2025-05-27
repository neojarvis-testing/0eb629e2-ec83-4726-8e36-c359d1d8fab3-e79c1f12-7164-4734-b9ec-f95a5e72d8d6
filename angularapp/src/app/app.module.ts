import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { CoordinatorViewRequirementsComponent } from './components/coordinator-view-requirements/coordinator-view-requirements.component';
import { CoordinatorViewTrainersComponent } from './components/coordinator-view-trainers/coordinator-view-trainers.component';
import { CoordinatornavComponent } from './components/coordinatornav/coordinatornav.component';
import { CoordinatorviewfeedbackComponent } from './components/coordinatorviewfeedback/coordinatorviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { ManagerNavComponent } from './components/managernav/managernav.component';
import { ManagerpostfeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { TrainerManagementComponent } from './components/trainer-management/trainer-management.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthguardComponent,
    CoordinatorViewRequirementsComponent,
    CoordinatorViewTrainersComponent,
    CoordinatorviewfeedbackComponent,
    CoordinatornavComponent,
    ErrorComponent,
    HomePageComponent,
    ManagerRequirementComponent,
    ManagerViewRequirementsComponent,
    ManagerNavComponent,
    ManagerpostfeedbackComponent,
    ManagerviewfeedbackComponent,
    SelectedTrainersComponent,
    SignupComponent,
    TrainerDetailsComponent,
    TrainerManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
