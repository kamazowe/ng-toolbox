export interface UiPost {
  id: string;
  title: string;
  views: number;
  comments: {
    text: string;
  }[]
}
