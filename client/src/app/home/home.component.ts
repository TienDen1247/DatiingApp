import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  RegisterMode = false;

  constructor() { }

  ngOnInit(): void {    
  }

  registerToggle() {
    this.RegisterMode = !this.RegisterMode;
  }

  cancelRegisterMode(event: any){
    this.RegisterMode = event;
  }

}
