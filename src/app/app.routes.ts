import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Dashboard } from './dashboard/dashboard';


export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'home', component: Home, title: 'home'},
    {path: 'about', component: About, title: 'about'},
    {path: 'contact', component: Contact, title: 'contact'},
    {path: 'dashboard', component: Dashboard, title: 'dashboard'},
    {path: '**', redirectTo: 'home' }
];
