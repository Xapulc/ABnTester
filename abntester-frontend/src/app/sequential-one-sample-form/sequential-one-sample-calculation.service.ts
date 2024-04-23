import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  CalculateOneSampleBinaryRequest,
  CalculateOneSampleResponse,
} from './sequential-one-sample-form-model';

@Injectable({
  providedIn: 'root',
})
export class OneSampleCalculationService {

  constructor(private http: HttpClient) {
  }

  basePath = '/api/one-sample-sequential/calculate'

  calculateBinary(request: CalculateOneSampleBinaryRequest): Observable<CalculateOneSampleResponse> {
    return this.http.post<CalculateOneSampleResponse>(`${this.basePath}/binary`, request);
  }
}
