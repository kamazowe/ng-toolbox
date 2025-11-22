export type GetCommentsRequestQuery = { postId: number }

export const getCommentsPath = (payload: GetCommentsRequestQuery) => `comments?_postId=${payload.postId}`

export interface CommentsDto {
  id: string,
  text: string,
  postId: string
}

export type GetCommentsResponse = CommentsDto[];
