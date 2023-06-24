import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculateTwoSampleBinaryRequest, CalculateTwoSampleResponse} from './two-sample-form-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwoSampleCalculationService {

  constructor(private http: HttpClient) {
  }

  basePath = '/api/two-sample/calculate'

  calculateBinary(request: CalculateTwoSampleBinaryRequest): Observable<CalculateTwoSampleResponse> {
    return this.http.post<CalculateTwoSampleResponse>(`${this.basePath}/binary`, request);
  }
}
