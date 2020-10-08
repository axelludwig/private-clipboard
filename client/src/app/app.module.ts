import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { Routes, RouterModule } from '@angular/router';
import { ClipComponent } from './clip/clip.component';
import { NewClipComponent } from './new-clip/new-clip.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'public-clipboard/public', pathMatch: 'full' },
  { path: 'public-clipboard/public', component: PublicComponent },
  { path: 'public-clipboard/private', component: PrivateComponent },
  { path: '**', redirectTo: 'public-clipboard/public' }
];
@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    ClipComponent,
    NewClipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
