import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetricContainerComponent } from './metric-container.component';
import { LumberjackModule } from '@ngworker/lumberjack';
import {
  LumberjackConsoleDriver,
  LumberjackConsoleDriverModule,
} from '@ngworker/lumberjack/console-driver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MetricContainerComponent,
    LumberjackModule.forRoot(),
    LumberjackConsoleDriverModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
