import { Component, OnInit } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public aFAuth: AngularFireAuth, private router: Router,private authService: AuthService) { }
  public email: string = '';
  public pass: string = '';

  ngOnInit() {
  }
    onLogin(): void{
    
      this.authService.loginEmailUser(this.email,this.pass)
      .then((res)=>{//res es una promesa
        this.onLoginRedirect();     
      }).catch(err=>this.onLoginErrMessage(err));
      
    }
    onLoginGoogle(): void{//metodo de login google a travez del service
      this.authService.loginGoogleUser()
      .then((res)=>{//res es una promesa  
        this.onLoginRedirect();
      }).catch(err=>this.onLoginErrMessage(err));
      
    }

    onLoginFacebook(): void{
      this.authService.loginFacebookUser()
      .then((res)=>{//res es una promesa
       this.onLoginRedirect();
      }).catch(err=>this.onLoginErrMessage(err));
      
    }
    onLogout(){
      this.authService.logoutUser();
    }

    onLoginRedirect(): void{
      this.router.navigate(['admin/list-books']);
    }

    onLoginErrMessage(err: { message: any; }): any{
      console.log('err',err.message);
    }
    
}
