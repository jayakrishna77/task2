import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Covid19-Cases';
 
  loadedPosts : Post[] = [];

  isFetchingisloaded = false;

  public _URL:string="http//828c6510c6459ce9126e618099e079d4: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@analogit.myshopify.com/admin/api/2020-07/products.json";


  public _url:string="https://covid19-cases-task.firebaseio.com/posts.json"
 
  constructor( private http:HttpClient){  }
  
  ngOnInit(){ this.onFetchPosts()}
  
  onCreatePost(postData:Post){
  this.http.post<{name:string}>(this._url, postData)
            .subscribe(returnData => {
              console.log(returnData)
            });
            
          }


onFetchPosts(){
  this.isFetchingisloaded= true;
  this.http.get<{[key:string]:Post}>(this._url)
            .pipe(map(responseData => {
              const postsArray : Post[]=[];
              for( const key in responseData){
                if(responseData.hasOwnProperty(key)){
                  postsArray.push({...responseData[key],id:key});
                }
              }
              return postsArray;
            }))
            .subscribe(data => {
             this.loadedPosts = data ;
             this.isFetchingisloaded = false;
            })
}

onClearPosts(){
  this.http.delete(this._url)
                 .subscribe(() => {
                   this.loadedPosts = [] ;
                 });
}
 
}
