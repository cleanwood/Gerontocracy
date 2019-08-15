import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedAccountService } from '../../../shared/services/shared-account.service';
import { AffairService } from '../../services/affair.service';
import { VorfallDetail } from '../../models/vorfall-detail';
import { VoteType } from '../../models/vote-type';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {

  @Input() data: VorfallDetail;

  @Input() isPopup = false;
  @Output() popout: EventEmitter<void> = new EventEmitter<void>();
  @Output() vorfallClicked: EventEmitter<number> = new EventEmitter<number>();

  public VoteType = VoteType;

  constructor(
    private affairService: AffairService,
    private sharedAccountService: SharedAccountService,
  ) { }

  ngOnInit() {
  }

  onVoteClicked(type: VoteType): void {

    this.sharedAccountService.isLoggedIn().toPromise().then(n => {
      if (n) {

        let newVoteType: VoteType;
        if (this.data.userVote !== type) {
          newVoteType = type;
        }

        this.affairService
          .vote(this.data.id, newVoteType)
          .toPromise()
          .then(() => this.data.userVote = newVoteType);
      }
    });
  }
}
