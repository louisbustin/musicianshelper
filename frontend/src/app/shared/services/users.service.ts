import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, map, mergeMap, shareReplay, take } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';
import IProfileWithAuthModel from '../../users/models/profile-with-auth-model.model';
import IProfile from '../../users/models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private updatedProfileSubject$ = new Subject<IProfile>();
    updatedProfile$ = this.updatedProfileSubject$.asObservable();

    // combine user from Auth0 with the profile from the database
    userProfile$ = combineLatest([
        this.auth.user$,
        merge(this.getProfile(), this.updatedProfile$)
    ]).pipe(
        map(([authProfile, dbProfile]) => {
            const prof: IProfileWithAuthModel = {
                authModel: authProfile,
                ...dbProfile
            }
            return prof;
        }),
        shareReplay(1),
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
                            const profile: IProfile = {
                                _id: undefined,
                                name: p.name,
                                email: p.email,
                                useAuthProfilePic: true,
                                profilePic: undefined,
                                owner: undefined,
                                zip: p.zip,
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
                    owner: p.user_id,
                    zip: p.zip,
                }
                return profile;
            })
        )
        .toPromise();
    }

    uploadProfilePic(file: File): void {
        if (file) {
            const formData = new FormData();
            formData.append("profilepic", file);
            const upload$ = this.webRequestService.postFormData<IProfile>(`profiles/profilepic`, formData);
            upload$.subscribe(p => this.updatedProfileSubject$.next(p));
        }
    }

    updateProfile(profile: IProfileWithAuthModel): void {
        this.webRequestService.put(`profiles/${profile._id}`, profile)
        .subscribe(p => {
            this.updatedProfileSubject$.next(p);
        });
    }
}