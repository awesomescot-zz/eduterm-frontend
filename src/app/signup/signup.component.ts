import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {
  model = { username:'',
    password1:'',
    password2:''
  };
  constructor(private authService: AuthService) { }

  onSubmit(){
    console.log(this.model);
    this.authService.signup({username:this.model.username,
      password:this.model.password1,
      available_chapters:[]});
  }

  ngOnInit() {
  }

}
