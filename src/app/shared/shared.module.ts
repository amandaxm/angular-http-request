import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConnfirmComponent } from './connfirm/connfirm.component';



@NgModule({
  declarations: [AlertModalComponent, ConnfirmComponent, ConnfirmComponent],
  imports: [
    CommonModule
  ],
  exports:[AlertModalComponent],
  entryComponents:[AlertModalComponent,ConnfirmComponent]
  
})
export class SharedModule { }
