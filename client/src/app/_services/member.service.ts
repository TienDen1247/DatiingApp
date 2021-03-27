import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginationHeaders, getPaginationResult } from './paginationHelper';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    baseUrl = environment.apiUrl;
    userParams: UserParams;
    members: Member[] = [];
    memberCache = new Map();
    user: User;

    constructor(private http: HttpClient, private accountService: AccountService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
            this.user = user;
            this.userParams = new UserParams(user);
        });

    }

    getUserParams(): any{
        return this.userParams;
    }

    setUserParams(params: UserParams): any {
        this.userParams = params;
    }

    resetUserParams(): any {
        return new UserParams(this.user);
    }

    getMembers(userParams: UserParams): any{
        const responseCache = this.memberCache.get(Object.values(userParams).join('-'));
        if (responseCache) {
            return of(responseCache);
        }
        let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

        params = params.append('minAge', userParams.minAge.toString());
        params = params.append('maxAge', userParams.maxAge.toString());
        params = params.append('gender', userParams.gender.toString());
        params = params.append('orderby', userParams.orderby.toString());

        return getPaginationResult<Member[]>(this.baseUrl + 'users', params, this.http)
            .pipe(map(response => {
                this.memberCache.set(Object.values(userParams).join('-'), response);
                return response;
            }));
    }

    getMember(username: string): any {
        const members = [...this.memberCache.values()]
            .reduce((arr, elem) => arr.concat(elem.result), [])
            .find((member: Member) => {
                return member.username === username;
            });

        if (members) { return of(members); }

        return this.http.get<Member>(this.baseUrl + 'users/' + username);
    }

    updateMember(member: Member): any{
        return this.http.put(this.baseUrl + 'users', member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = member;
            })
        );
    }

    setMainPhoto(photoId: number): any {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    }

    deletePhoto(photoId: number): any {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }

    addLike(username: string): any {
        return this.http.post(this.baseUrl + 'likes/' + username, {});
    }

    getLikes(predicate: string, pageNumber: number, pageSize: number): any {

        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('predicate', predicate);

        return getPaginationResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
    }
}
