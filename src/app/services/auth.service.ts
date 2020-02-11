import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore';
import { UserInterface } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth,private afs: AngularFirestore) { }

  registerUser(email:string,pass:string){//creamos el usuario
    return new Promise ((resolve,reject)=>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then(userData=>{
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(err=>console.log(reject(err)))
    });
  }

  loginEmailUser(email: string,pass: string){//metodo de login con email y pass
    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData=>resolve(userData),
      err=>reject (err));
    });
  }

  loginFacebookUser(){//metodo de login a facebook,crea a cuenta si no existe
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then(credential=>this.updateUserData(credential.user))
  }

  loginGoogleUser(){//metodo de login a google,crea la cuenta si no existe
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(credential=>this.updateUserData(credential.user))
  }

  logoutUser(){//cerrar sesion
    return this.afsAuth.auth.signOut();
  }

  isAuth() {//comprueba si el usuario esta logueado
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, { merge: true })
  }


  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();//devuelve el docuemnto que corresponda con el id
  }

}
