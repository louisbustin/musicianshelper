import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { WebRequestService } from '../shared/services/web-request.service';
import IProfileWithAuthModel from './models/profile-with-auth-model.model';
import IProfile from './models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    // combine user from Auth0 with the profile from the database
    userProfile$ = combineLatest([
        this.auth.user$,
        this.getProfile()
    ]).pipe(
        map(([authProfile, dbProfile]) => {
            const prof: IProfileWithAuthModel = {
                authModel: authProfile,
                ...dbProfile
            }
            return prof;
        })
    );

    constructor(
        private auth: AuthService,
        private webRequestService: WebRequestService
    ) {}

    getProfile(): Observable<IProfile> {
        return this.webRequestService.get<IProfile>(`profiles`).pipe(
            catchError(err => {
                if (err.status === 404) {
                    // this user did not have a profile record already. create one
                    return this.auth.user$.pipe(
                        take(1),
                        mergeMap(p => {
                            console.log('mapping');
                            const profile: IProfile = {
                                _id: undefined,
                                name: p.name,
                                email: p.email,
                                useAuthProfilePic: true,
                                profilePic: undefined,
                                owner: undefined
                            }
                            return this.webRequestService.post('profiles', profile);
                        })
                    )
                } else {
                    console.log(err);
                    return EMPTY;
                }
            })
        );
    }

    getProfileFromCurrentUser(): Promise<IProfile> {
        return this.auth.user$
        .pipe(
            take(1),
            map((p) => {
                const profile: IProfile = {
                    _id: undefined,
                    name: p.name,
                    email: p.email,
                    useAuthProfilePic: true,
                    profilePic: undefined,
                    owner: p.user_id
                }
                return profile;
            })
        )
        .toPromise();
    }
}