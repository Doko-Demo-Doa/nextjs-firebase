export {};

declare global {
  type PostType = {
    title: string;
    content?: string;
    image?: string;
  };
}
