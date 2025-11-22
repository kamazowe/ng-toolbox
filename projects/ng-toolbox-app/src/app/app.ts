import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { mapToUiPost } from './map-to-ui-post.mapper';
import { DataService } from './data.service';
import { CommentsDto } from './get-comments.request';
import { PostDto } from './get-post-details.request';
import { remappedMultipleResources } from 'ng-toolbox';


@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
})
export class App {
  protected dataService = inject(DataService)

  uiPostResource = remappedMultipleResources([this.dataService.post, this.dataService.comments],
    (values: [PostDto | undefined, CommentsDto[] | undefined] | undefined) => {
      if (!values || !values[0] || !values[1]) {
        return undefined
      }

      return mapToUiPost(values[0], values[1])
    })

  protected loadData(postId: number): void {
    this.dataService.postQuery.set({postId})
    this.dataService.commentsQuery.set({postId})
  }
}
