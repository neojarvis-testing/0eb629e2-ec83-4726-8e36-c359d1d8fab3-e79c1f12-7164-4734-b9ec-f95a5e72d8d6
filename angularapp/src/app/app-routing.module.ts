import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component'; // Update path and class name
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoordinatornavComponent } from './components/coordinatornav/coordinatornav.component';
import { ManagerNavComponent } from './components/managernav/managernav.component';
import { ManagerRequirementComponent } from './components/manager-requirement/manager-requirement.component';
import { ManagerViewRequirementsComponent } from './components/manager-view-requirements/manager-view-requirements.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { SelectedTrainersComponent } from './components/selected-trainers/selected-trainers.component';
import { ManagerPostFeedbackComponent } from './components/managerpostfeedback/managerpostfeedback.component';
import { ManagerViewFeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomePageComponent},
  { path:'signup', component: SignupComponent},
  { path: 'coordinatornav', component: CoordinatornavComponent},
  { path: 'managernav', component: ManagerNavComponent},
  { path: 'manager-requirement', component: ManagerRequirementComponent},
  { path: 'manager-view-requirement', component: ManagerViewRequirementsComponent},
  { path: 'trainer-details', component: TrainerDetailsComponent},
  { path: 'selected-trainers', component: SelectedTrainersComponent},
  { path: 'managerpostfeedback', component: ManagerPostFeedbackComponent},
  { path: 'managerviewfeedback', component: ManagerViewFeedbackComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
