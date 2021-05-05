import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmail } from 'src/app/models/email.model';
import { WebRequestService } from './web-request.service';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(
        private webRequestService: WebRequestService
    ) { }

    sendEmail = (email: IEmail): Observable<unknown> => {
        return this.webRequestService.post('email', email);
    }
}