import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery/lib/ngx-gallery-image';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { flatMap, take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/Message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild("memberTabs", {static: true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activedTab: TabDirective;
  messages: Message[] = [];
  user: User;

  constructor(public presence: PresenceService, private route: ActivatedRoute, 
    private messageService: MessageService, private accountService: AccountService,
    private router: Router) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy
    }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    })
    this.route.queryParams.subscribe(param => {
      param.tab ? this.selectTab(3) : this.selectTab(0);
    })

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }]

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imagesUrls = [];
    for (const photo of this.member.photos) {
      imagesUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      })
    }
    return imagesUrls;
  }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(response => this.messages = response);
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActived(data: TabDirective){
    this.activedTab = data;
    if(this.activedTab.heading === 'Messages' && this.messages.length == 0) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy() {
    this.messageService.stopHubConnection();
  }
}
