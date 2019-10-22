import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomPipe} from './custom-pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialDesignModule} from './material-design/material-design.module';
import {CacheMapService} from './interceptor.cache.files/cache-map.service';
import {CachingInterceptor} from './interceptor.cache.files/caching-interceptor';
import {LoggingInterceptor} from './interceptor.cache.files/logging-interceptor';
import {BookComponent} from './interceptor.cache.files/book.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {TestData} from './interceptor.cache.files/test-data';
import {BookService} from './interceptor.cache.files/book.service';
import {I18nDirective} from './i18n.directive';
import {I18nPipe} from './i18n.pipe';
import {CommentsComponent} from './comments/comments.component';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true}
];

@NgModule({
  declarations: [
    AppComponent,
    CustomPipe,
    BookComponent,
    I18nDirective,
    I18nPipe,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(TestData),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    BookService,
    httpInterceptorProviders,
    CacheMapService,
    {provide: 'Cache', useClass: CacheMapService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
