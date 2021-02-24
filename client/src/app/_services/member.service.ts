import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { Member } from '../_models/member'
import { PaginatedResult } from '../_models/pagination'
import { User } from '../_models/user'
import { UserParams } from '../_models/userParams'
import { AccountService } from './account.service'
import { getPaginationHeaders, getPaginationResult } from './paginationHelper'

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
        })

    }

    getUserParams() {
        return this.userParams;
    }

    setUserParams(params: UserParams) {
        this.userParams = params;
    }

    resetUserParams() {
        return new UserParams(this.user);
    }

    getMembers(userParams: UserParams) {
        let response = this.memberCache.get(Object.values(userParams).join('-'));
        if (response) {
            return of(response);
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

    getMember(username: string) {
        const member = [...this.memberCache.values()]
            .reduce((arr, elem) => arr.concat(elem.result), [])
            .find((member: Member) => member.username == username);

        if (member) return of(member);

        return this.http.get<Member>(this.baseUrl + 'users/' + username);
    }

    updateMember(member: Member) {
        return this.http.put(this.baseUrl + 'users', member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = member;
            })
        );
    }

    setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }

    addLike(username: string) {
        return this.http.post(this.baseUrl + 'likes/' + username, {});
    }

    getLikes(predicate: string, pageNumber: number, pageSize: number) {

        var params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append("predicate", predicate);

        return getPaginationResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
    }  
}