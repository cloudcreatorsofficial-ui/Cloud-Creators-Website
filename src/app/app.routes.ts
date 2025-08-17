import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent }
];
