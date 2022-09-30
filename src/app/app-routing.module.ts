import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PortfolioComponent } from './portfolio/portfolio.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'projects', component: PortfolioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },
    { path: 'blog', loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule) },
    { path: 'dev-tv', loadChildren: () => import('./modules/tv/tv.module').then(m => m.TvModule) },
    { path: 'notfound', component: PagenotfoundComponent },
    { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
