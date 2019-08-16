import { Component, OnInit, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { TreeNode, DialogService } from 'primeng/api';
import { ThreadDetail } from '../../models/thread-detail';
import { Post } from '../../models/post';
import { DatePipe } from '@angular/common';
import { LikeType } from '../../models/like-type';
import { BoardService } from '../../services/board.service';
import { SharedAccountService } from '../../../shared/services/shared-account.service';
import { LoginDialogComponent } from '../../../../components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {

  @Input() data: ThreadDetail;

  @Input() isPopup = false;
  @Output() popout: EventEmitter<void> = new EventEmitter<void>();

  public LikeType = LikeType;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private boardService: BoardService,
    private sharedAccountService: SharedAccountService,
    private dialogService: DialogService) { }

  items: TreeNode[];

  ngOnInit() {
    this.items = [this.convertToTreeNode(this.data.initialPost)];
  }

  private convertToTreeNode(data: Post): TreeNode {
    console.log(data);
    return {
      label: data.userName,
      data: { ...data, showReply: false },
      expanded: true,
      children: data.children.map(n => this.convertToTreeNode(n))
    };
  }

  like(type: LikeType, post: Post) {
    this.sharedAccountService.isLoggedIn().toPromise().then(n => {
      if (n) {
        let newLikeType: LikeType;
        const ul = post.userLike;

        if (ul === LikeType.like) {
          if (type === LikeType.like) {
            post.likes--;
          } else {
            post.likes--;
            post.dislikes++;
            newLikeType = LikeType.dislike;
          }
        }

        if (ul === LikeType.dislike) {
          if (type === LikeType.like) {
            post.likes++;
            post.dislikes--;
            newLikeType = LikeType.like;
          } else {
            post.dislikes--;
          }
        }

        if (ul === null || ul === undefined) {
          if (type === LikeType.like) {
            post.likes++;
            newLikeType = LikeType.like;
          } else {
            post.dislikes++;
            newLikeType = LikeType.dislike;
          }
        }

        this.boardService
          .like(post.id, newLikeType)
          .toPromise()
          .then(() => post.userLike = newLikeType);
      } else {
        this.showLoginDialog();
      }
    });
  }

  private showLoginDialog() {
    this.dialogService.open(LoginDialogComponent,
      {
        header: 'Login',
        width: '407px',
        closable: false,
      })
      .onClose
      .subscribe(() => window.location.reload());
  }

  reply(node: TreeNode, value: string) {
    this.sharedAccountService.isLoggedIn().toPromise().then(r => {
      if (r) {
        if (value != null && value.length < 255) {
          this.boardService.reply(node.data.id, value)
            .toPromise()
            .then(() => window.location.reload());
        }
      } else {
        this.showLoginDialog();
      }
    });
  }

  private convertDate(date: Date) {
    return new DatePipe(this.locale).transform(date, 'dd.MM.yyyy hh:mm:ss');
  }
}
