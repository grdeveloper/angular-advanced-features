import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

const modules: any[] = [
  MatButtonModule,
  MatCheckboxModule,
  CdkTableModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatTabsModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialDesignModule { }
