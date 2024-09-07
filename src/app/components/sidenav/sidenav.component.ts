import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIcon],
  template: `
    <div class="sidenav-header">
      <img src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=740&t=st=1725716069~exp=1725716669~hmac=3a215c78747d0a0b8eb941bf3e8b929fa6626d1c94839122abd670c39c04ca54" [width]="profilePictureSize()" [height]="profilePictureSize()" alt="Avatar profile">

      <div class="header-text" [hidden]="sideNavCollapsed()">
        <h2>Your channel</h2>
        <p>Clid Robalo</p>
      </div>

      <hr>

      <mat-nav-list>
        <a mat-list-item *ngFor="let item of menuItems()">
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <span matListItemTitle>{{ item.label }}</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: `
    .sidenav-header {
      padding-top: 24px;
      text-align: center;

      > img {
        border-radius: 100%;
        /*
          ensures that the image always fills the circular container (due to border-radius: 100%;) without distortion, regardless of the original image's dimensions.
          The image will be cropped if necessary, but it will always look properly scaled and centered within its container.
        */
        object-fit: cover;
        margin-bottom: 10px;
      }

      .header-text {
        > h2 {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5rem; // the line height is 1.5 times the root element font size.
        }

        > p {
          margin: 0;
          font-size: 0.8rem;
        }
      }

      hr {
        border: none;
        height: 1px;
        background-color: #e0e0e0;
        margin: 16px 0;
      }

      mat-nav-list {
        text-align: left;
      }
    }
  `
})
export class SidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content'
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics'
    },
    {
      icon: 'comments',
      label: 'Comments',
      route: 'comments'
    },
  ]);

  profilePictureSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
