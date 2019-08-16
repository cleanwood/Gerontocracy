
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {

  showSuccess: boolean;
  showError: boolean;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.showSuccess = false;
    this.showError = false;

    this.activatedRoute.queryParams.subscribe(params => {
      this.accountService.confirmEmail({
        id: +params.userId,
        token: params.token
      })
        .toPromise()
        .then(() => this.showSuccess = true)
        .catch(() => this.showError = true);
    });
  }

  ngOnInit() {
  }

}
