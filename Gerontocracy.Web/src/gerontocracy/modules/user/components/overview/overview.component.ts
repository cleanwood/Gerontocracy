import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class UserOverviewComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
