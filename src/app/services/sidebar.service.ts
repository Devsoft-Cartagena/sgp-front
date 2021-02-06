import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor() { }

  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard'
    },
    {
      title: 'Perfil',
      icon: 'manage_accounts',
      url: 'profile'
    },
    {
      title: 'Personas',
      icon: 'accessibility_new',
      url: 'persons'
    },
    {
      title: 'Clientes',
      icon: 'supervisor_account',
      url: 'clients'
    }
  ];
}
