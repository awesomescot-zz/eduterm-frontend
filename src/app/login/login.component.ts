import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  model:User = { username:'',
    password:'',
    available_chapters:[]
  };
  onSubmit(){
    console.log(this.model);
    this.authService.login(this.model);
  }
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

}
