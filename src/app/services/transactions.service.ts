import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Transaction} from '../models/transaction.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {
  }

  getTransactions(
    page?: number, perPage?: number, accountId?: number,
    creditId?: number, origin?: string, clientId?: number,
    userId?: number, processId?: number, adviserId?: number,
    transactionTypeId?: string, date?: string, all?: boolean): Observable<{ transactions: Transaction[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (perPage == null) {
      perPage = 10;
    }
    let account = '';
    if (accountId != null) {
      account = `&account=${accountId}`;
    }
    let credit = '';
    if (creditId != null) {
      credit = `&credit=${creditId}`;
    }
    let origins = '';
    if (origin != null) {
      origins = `&origin=${origin}`;
    }
    let client = '';
    if (clientId != null) {
      client = `&client=${clientId}`;
    }
    let user = '';
    if (userId != null) {
      user = `&user=${userId}`;
    }
    let process = '';
    if (processId != null) {
      process = `&process=${processId}`;
    }
    let adviser = '';
    if (adviserId != null) {
      adviser = `&adviser=${adviserId}`;
    }
    let dateUrl = '';
    if (date != null) {
      dateUrl = `&${date}`;
    }
    let transactionType = '';
    if (transactionTypeId != null) {
      transactionType = `&type_transaction=${transactionTypeId}`;
    }
    const url = all
      ? `${base_url}/transactions/all?all=${true}${account}${credit}${origins}${client}${user}${process}${adviser}${transactionType}${dateUrl}`
      : `${base_url}/transactions/all?page=${page}&per_page=${perPage}${account}${credit}${origins}${client}${user}${process}${adviser}${transactionType}${dateUrl}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const transactions: Transaction[] = resp.transactions.data;
          const total: number = resp.transactions.total;
          return {transactions, total};
        })
      );
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`${base_url}/transactions/delete/${transactionId}`);
  }
}
