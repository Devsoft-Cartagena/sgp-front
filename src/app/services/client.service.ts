import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
    private router: Router) { }


  getClients(): Observable<Client[]> {
    const url = `${base_url}/clients/all`;
    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        const clients: Client[] = resp.clients.data;
        return clients;
      })
    );
  }
}
