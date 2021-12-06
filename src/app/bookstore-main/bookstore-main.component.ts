import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'app-bookstore-main',
  templateUrl: './bookstore-main.component.html',
  styleUrls: ['./bookstore-main.component.css']
})
export class BookstoreMainComponent implements OnInit {

  baseUrl = 'http://192.168.1.203:8180/auth/realms/appsdeveloperblog/protocol/openid-connect/';
   
  constructor(private http:HttpClient) {
  }

  code = this.getUrlParameter("code");

  ngOnInit(): void {
    this.accedi();
  }

  accedi():void {

    console.log("accedi");
    console.log(this.getUrlParameter("code"))

    if(this.getUrlParameter("code") == null || this.getUrlParameter("code") == undefined || this.getUrlParameter("code") == ''){
      console.log("getAuthorizathionCode")
      window.location.href=`${this.baseUrl}auth?client_id=booke-store-app-client&response_type=code&scope=openid profile&state=asdafsg&redirect_uri=http://localhost:4200`;
      //this.accedi();
    }
    if(this.getUrlParameter("code")){
        console.log("getToken")
        let options = {
           headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')            
        };
        let code = this.getUrlParameter("code");
        const body = `grant_type=authorization_code&code=${code}&responseType=code&client_id=booke-store-app-client&scope=profile&redirect_uri=http://localhost:4200`;

        this.http.post(`${this.baseUrl}token`,
        body
        ,{headers:options.headers})
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", val);
            },
            response => {
                console.log("POST call in error", response);
                //Se c'è un errore torno alla pagina iniziale dell'applicazione
                window.location.href="http://localhost:4200";
            },
            () => {
                console.log("The POST observable is now completed.");
            });
      }else{

      }
   
  }

    private getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    onLogout(){
      window.location.href = `${this.baseUrl}logout?redirectUri=http://localhost:4200`;
    }
}
