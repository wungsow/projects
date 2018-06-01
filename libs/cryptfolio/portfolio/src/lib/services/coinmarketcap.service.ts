import { Response } from './response.model';
import { ResponseArray } from './response-array.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin, Ticker } from '@projects/cryptfolio/portfolio/src/lib/+state/portfolio.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class CoinmarketcapService {
  private readonly listingsPath = this.getPath('listings');
  private readonly tickersPath = this.getPath('ticker');
  private readonly tickerLimit = 100;

  constructor(private httpClient: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    return this.httpClient.get<ResponseArray<Coin>>(this.listingsPath).pipe(map(response => response.data));
  }

  getTickers(page: number = 1): Observable<{ [id: string]: Ticker }> {
    const start = (page - 1) * this.tickerLimit + 1,
      options = { params: { start: start.toString() } };
    return this.httpClient.get<Response<Ticker>>(this.tickersPath, options).pipe(map(response => response.data));
  }

  private getPath(endpoint) { return `https://api.coinmarketcap.com/v2/${endpoint}/` };
}
