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

    // profile search results
    private searchZipSubject$ = new Subject<string>();
    searchZip$ = this.searchZipSubject$.asObservable();

    private searchRadiusSubject$ = new Subject<number>();
    searchRadius$ = this.searchRadiusSubject$.asObservable();

    searchResults$ = combineLatest([this.searchZip$, this.searchRadius$])
    .pipe(
        mergeMap(([searchZip, searchRadius]) => {
            return this.webRequestService.get<IProfile>(`profiles/searchbydistance/${searchZip}/${searchRadius}`);
        })
    )

    //current user profile info
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
                                ssoProfilePicLink: p.picture,
                                profilePic: undefined,
                                owner: undefined,
                                zip: p.zip,
                                instrumentTags: undefined,
                                lookingForTags: undefined,
                                influencesTags: undefined,
                                bio: ''
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

    getProfileById(userId: string): Observable<IProfile> {
        return this.webRequestService.get<IProfile>(`profiles/${userId}`)
            .pipe(
                catchError( err => {
                    console.log(err);
                    return EMPTY;
                })
            )
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
                    ssoProfilePicLink: p.picture,
                    profilePic: undefined,
                    owner: p.user_id,
                    zip: p.zip,
                    instrumentTags: undefined,
                    lookingForTags: undefined,
                    influencesTags: undefined,
                    bio: '',
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
        const profilePic = profile.profilePic;
        profile.profilePic = undefined; // make sure this is cleared, we do not want to send this up every time.
        this.webRequestService.put(`profiles/${profile._id}`, profile)
        .subscribe(p => {
            p.profilePic = profilePic;
            this.updatedProfileSubject$.next(p);
        });
    }

    searchProfiles(zip: string, radius: number): void {
        this.searchZipSubject$.next(zip);
        this.searchRadiusSubject$.next(radius);
    }
}