import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedPartyService } from './services/shared-party.service';
import { SharedAccountService } from './services/shared-account.service';
import { SharedBoardService } from './services/shared-board.service';

import { StringTrimPipe } from './pipes/string-trim.pipe';
import { FullnamePipe } from './pipes/fullname.pipe';

@NgModule({
  declarations: [
    StringTrimPipe,
    FullnamePipe,
  ],
  exports: [
    StringTrimPipe,
    FullnamePipe,
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
  ],
  providers: [
    SharedAccountService,
    SharedPartyService,
    SharedBoardService
  ],
})
export class SharedModule { }
