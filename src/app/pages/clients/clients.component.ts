import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[] = [];
  public displayedColumns: string[] = ['Nombre', 'Documento', 'Telefono', 'Email'];
  public dataSource = new MatTableDataSource<Client>(this.clients);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
    .subscribe(resp => {
      this.clients = resp;
    }, err => {
      Swal.fire('Error', "Ha ocurrido un error inesperado", 'error');
    });
  }

}
