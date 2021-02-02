import { Component, OnInit } from '@angular/core'

import { Member } from '../_models/member'
import { Pagination } from '../_models/pagination'
import { MemberService } from '../_services/member.service'

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  members: Partial<Member[]>;
  pageNumber = 1;
  pageSize = 1;
  predicate = 'liked';
  pagination: Pagination;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.members = response.result;
        this.pagination = response.pagiantion;
      })
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
