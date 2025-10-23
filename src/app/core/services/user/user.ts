import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { token } from '../../interfaces/token';
@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


}
