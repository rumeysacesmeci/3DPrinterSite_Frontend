import { Component, NgModule, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouterModule } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { SettingComponent } from './user/setting/setting.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from 'src/app/login/login.component';
import { CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations:[
        NavbarComponent,
        UserComponent,
        LoginComponent,
        SettingComponent
        ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ],
})

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    public isLoggedIn = false; 
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    

    constructor(public location: Location, private router: Router) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
}
