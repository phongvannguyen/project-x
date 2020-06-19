import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url = AppConstants.URL_API + 'user';
  public userProfile = new BehaviorSubject<UserModel>(null);
  public userProfile$ = this.userProfile.asObservable();

  constructor(private http: HttpClient) { }

  public getProfile(): void {
    //
  }

  public register(user: UserModel): Observable<UserModel> {
    return this.http.post(this.url + '/register', user).pipe(
      map((newUser: UserModel) => {
          console.log();
          return newUser;
        }
      )
    );
  }

  public login(user: UserModel): Observable<any> {
    return this.http.post(this.url + '/login', user)
    .pipe(
      map((userProfile: UserModel) => {
        this.userProfile.next(userProfile);
        localStorage.setItem('currentUser', JSON.stringify(userProfile));
      })
    );
  }
}
