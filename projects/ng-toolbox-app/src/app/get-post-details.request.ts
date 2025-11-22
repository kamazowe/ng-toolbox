export type GetPostDetailsRequestParams = { postId: number }

export const getPostDetailsPath = (payload: GetPostDetailsRequestParams) => `posts/${payload.postId}`

export interface PostDto {
  id: string,
  title: string,
  views: number
}

export type GetPostDetailsResponse = PostDto;
