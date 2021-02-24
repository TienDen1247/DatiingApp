import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery/lib/ngx-gallery-image';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { flatMap } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/Message';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild("memberTabs", {static: true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activedTab: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MemberService, private router: ActivatedRoute, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.member = data.member;
    })
    this.router.queryParams.subscribe(param => {
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
      this.loadMessages();
    }
  }
}
