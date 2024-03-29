
import { HttpClient, HttpResponse,  HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from '../models/user.model'

@Injectable()
export class UsersService {
    constructor(private http: HttpClient){}
    getUserByEmail(email: string): Observable<User> {
            return this.http.get<User>(`http://localhost:5000/users?email=${email}`)
    }
}