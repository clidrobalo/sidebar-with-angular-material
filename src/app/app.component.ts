import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from "./components/sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, SidenavComponent],
  template: `
    <mat-toolbar class="mat-elevation-z3">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-sidenav [collapsed]="collapsed()"></app-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>

  `,
  styles: [`
    mat-toolbar {
      position: relative;
      z-index: 5; // will appear on top of elements with lower z-index values
    }

    .content {
      padding: 24px;
    }

    mat-sidenav-container {
      /*
        100vh represents 100% of the viewport height (the full height of the browser window).
        64px is being subtracted from this height, which is typically the default height of the Angular Material toolbar.
        The purpose of this calculation is to make the sidenav container fill the entire vertical space of the viewport, minus the height of the toolbar.
      */
      height: calc(100vh - 64px);
    }

    mat-sidenav {
      background: white;
      border-radius: 0;
    }

    // Animation
    mat-sidenav, mat-sidenav-content {
      transition: all 500ms ease-in-out;
    }
  `],
})
export class AppComponent {
  title = 'Sidenav';
  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}
