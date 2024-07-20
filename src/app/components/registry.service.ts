import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API, Registry } from './registry-interface';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  private storage: Storage
  private readonly API = 'https://viacep.com.br'

  constructor(private http: HttpClient) {
    this.storage = window.localStorage
  }

  list(cep:number): Observable<API> {
    const url = `${this.API}/ws/${cep}/json`
    return this.http.get<API>(url)
  }

  setInStorage(key: string, value: Registry[]) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getInStorage(key: any): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key)!);
    } return null
  }
}
