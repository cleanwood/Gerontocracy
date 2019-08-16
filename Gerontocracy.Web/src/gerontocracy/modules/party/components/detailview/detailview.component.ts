import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PolitikerDetail } from '../../models/politiker-detail';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {

  @Input() data: PolitikerDetail;

  @Input() isPopup = false;
  @Output() popout: EventEmitter<void> = new EventEmitter<void>();
  @Output() vorfallClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
