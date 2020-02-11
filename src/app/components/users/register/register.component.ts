import { Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service'
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private authService: AuthService,private storage: AngularFireStorage) { }
  @ViewChild('imageUser',{static:true}) inputImageUser: ElementRef;
  public email:string='';
  public pass:string ='';

  uploadPercent:Observable<number>; //observar el porsentaje segun se vaya subiendo nuestro fichero
  urlImage:Observable<string>;

  ngOnInit() {
  }

  onUpload(e){
    /*console.log('subir',e.target.files[0]);en el objeto e,en target> trae todas las propiedades de file,
                                            luego el elemento files e sun array ej e.target.files[0]
                                            y muestro lo que haya en ese elemento*/

    const id= Math.random().toString(36).substring(2);
    const file=e.target.files[0];//es el nombre del objeto,que se ha generado aleatoriamente
    const filePath=`uploads/profile_${id}`; //me guarda la imagen con un nombre y una id aleatorio
    const ref= this.storage.ref(filePath);//ruta del fichero
    const task=this.storage.upload(filePath,file);//subida del fichero
    this.uploadPercent=task.percentageChanges()//muestro el porsentaje de subida del fichero
    task.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL())).subscribe(); //recuperamos la url de la imagen subida
  }

  onAddUser(){//Registro del usuario
    this.authService.registerUser(this.email,this.pass)
    .then((res)=>{
      this.authService.isAuth().subscribe(user=>{//me devuelve el usuario actual que este logueado
        if(user){
          user.updateProfile({
            displayName:'',//actualizar el display name del usuario
            photoURL: this.inputImageUser.nativeElement.value //actualizar la photo de la url encuestion
          }).then(()=>{
            this.router.navigate(['admin/list-books']);
          }).catch((error)=> console.log('error',error));
        }
      });
    }).catch(err=>console.log('err',err.message));
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

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

  onLoginErrMessage(err: { message: any; }): any{
    console.log('err',err.message);
  }

}
