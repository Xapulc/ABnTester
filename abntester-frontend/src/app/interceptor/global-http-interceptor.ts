import {Inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          const errorMessage = error.error?.error || error.statusText
          const message = `${error.status}<br/>${errorMessage}`
          this.alerts
            .open(message, {
              label: 'Ошибка при обращении к серверу',
              status: TuiNotification.Error,
            }).subscribe()
        }
        console.error(error);
        return throwError(error.message);
      }),
    )
  }
}
