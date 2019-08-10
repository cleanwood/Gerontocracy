import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material';
import { UserDetail } from '../../models/user-detail';
import { Role } from '../../models/role';
import { MessageService } from 'Gerontocracy.Web/gerontocracy/modules/shared/services/message.service';
import { IconType } from 'Gerontocracy.Web/gerontocracy/modules/shared/models/icon-type';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss', '../../../../geronto-global-styles.scss']
})
export class PermissionDetailComponent implements OnInit {

  @Input() data: UserDetail;

  @Output() fullscreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  isFullscreen: boolean;

  isLoading: boolean;

  rolesSelected: Role[];

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isFullscreen = false;
    this.rolesSelected = this.data.roles;
  }

  toggleSize(evt: boolean) {
    this.isFullscreen = evt;
    this.fullscreen.emit(this.isFullscreen);
  }

  get loadedRoles() {
    return this.adminService.roles;
  }

  roleToSelected = (id: number): boolean => !!this.data.roles.find(n => n.id === id);

  rolesAggregated = (): string => this.rolesSelected.map(n => n.name).join(', ');

  toggleRole(id: number) {
    if (this.rolesSelected.find(n => n.id === id)) {
      this.rolesSelected.splice(this.rolesSelected.findIndex(n => n.id === id), 1);
    } else {
      this.rolesSelected.push(this.adminService.roles.find(n => n.id === id));
    }
  }

  saveRoles(evt: any) {
    this.messageService.showConfirmationBox(
      'Rollen speichern',
      'Sicher, dass die Rollen gespeichert werden sollen?',
      IconType.Question,
      'Rollen speichern',
      'Abbrechen').afterClosed().toPromise().then(m => {
        if (m) {
          this.isLoading = true;
          this.adminService
            .setUserRoles(this.data.id, this.rolesSelected.map(n => n.id))
            .toPromise()
            .then(_ => this.messageService.showSnackbar('Rollen wurden gespeichert!', 'Erfolg'))
            .then(_ => this.isLoading = false)
            .catch(n => this.messageService.showSnackbar('Es ist ein Fehler aufgetreten', 'Fehler'))
            .then(_ => this.isLoading = false);
        }
      });
  }
}
