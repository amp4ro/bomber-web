import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';
import { BomberActivationsComponent } from './bomber-activations/bomber-activations.component';
import { BuyComponent } from './buy/buy.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent },
  { path: 'bomber-activations', component: BomberActivationsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'admin-pannel', component: AdminPannelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
