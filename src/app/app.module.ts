import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClient } from '@angular/common/http';

// import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';

import { AppComponent } from './app.component';
import { QarListComponent } from './qar-list/qar-list.component';
import { DateChooseDirective } from './qar-list/date-choose.directive';
import { ServerService } from './server.service';

import { Translate } from './translate';
import { TranslatePipe } from './translate.pipe';
import { ScrollBottomDirective } from './qar-list/scroll-bottom.directive';

// export function HttpLoaderFactory(http: Http) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//   return new TranslateStaticLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    QarListComponent,
    DateChooseDirective,
    TranslatePipe,
    ScrollBottomDirective
  ],
  imports: [
    // TranslateModule.forRoot({
    //   provide: TranslateLoader,
    //   useFactory: (HttpLoaderFactory),
    //   deps: [Http]
    // }),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [Http]
    //   }
    // }),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ServerService, Translate, TranslatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
