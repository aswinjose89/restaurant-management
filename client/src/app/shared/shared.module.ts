import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { NgAgGridModule } from '../ag-grid.module';
import { MaterialExtensionsModule } from '@ng-matero/extensions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbComponent, PageHeaderComponent, ErrorCodeComponent, FormFieldComponent } from './components';

import { DisableControlDirective } from './directives/disable-control.directive';

import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ToObservablePipe } from './pipes/to-observable.pipe';

const MODULES = [
  MaterialModule,
  MaterialExtensionsModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgSelectModule,
  FormlyModule,
  FormlyMaterialModule,
  ToastrModule,
  TranslateModule,
  NgAgGridModule
];
const COMPONENTS = [BreadcrumbComponent, PageHeaderComponent, ErrorCodeComponent, FormFieldComponent];
const COMPONENTS_DYNAMIC = [];
const DIRECTIVES = [DisableControlDirective];
const PIPES = [SafeUrlPipe, ToObservablePipe];

@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...MODULES],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SharedModule {}
