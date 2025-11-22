import { UiPost } from './ui-post-model';
import { PostDto } from './get-post-details.request';
import { CommentsDto } from './get-comments.request';

export function mapToUiPost(post: PostDto, comments: CommentsDto[]): UiPost {
  return {
    comments: comments.map(c => ({
      text: c.text
    })),
    id: post.id,
    title: post.title,
    views: post.views
  }
}
