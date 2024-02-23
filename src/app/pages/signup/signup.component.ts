import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService
    ) { }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.signup(
      this.signUpForm.get('email')?.value as string,
      this.signUpForm.get('password')?.value as string
    )
    .then(cred => {
      
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: (this.signUpForm.get('email')?.value as string).split('@')[0],
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        }
      };
      //TODO: insert
      this.userService.create(user).then(_ => {
        console.log('user added successfully!');
      })
      .catch(err => {
        console.error(err);
      });
    
    })
    .catch(err => { 
      console.error(err);
    })
    ;
  }

  goBack() {
    this.location.back();
  }
}
 