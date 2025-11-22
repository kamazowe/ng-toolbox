import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { getPostDetailsPath, GetPostDetailsRequestParams, GetPostDetailsResponse } from './get-post-details.request';
import { getCommentsPath, GetCommentsRequestQuery, GetCommentsResponse } from './get-comments.request';
import { Optional } from 'ng-toolbox';

@Injectable({providedIn: 'root'})
export class DataService {
  private readonly httpClient = inject(HttpClient)

  public readonly commentsQuery: WritableSignal<Optional<GetCommentsRequestQuery>> = signal(undefined)
  public readonly postQuery: WritableSignal<Optional<GetPostDetailsRequestParams>> = signal(undefined)

  public readonly comments = rxResource({
    params: () => this.commentsQuery(),
    stream: ({params}) =>
      this.httpClient.get<GetCommentsResponse>(`http://localhost:3000/${getCommentsPath(params)}`)
        .pipe(delay(1000))
  }).asReadonly()
  public readonly post = rxResource({
    params: () => this.postQuery(),
    stream: ({params}) =>
      this.httpClient.get<GetPostDetailsResponse>(`http://localhost:3000/${getPostDetailsPath(params)}`)
        .pipe(delay(2000))
  }).asReadonly()
}
