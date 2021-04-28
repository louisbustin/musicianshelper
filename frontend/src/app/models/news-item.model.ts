export interface INewsItem {
    _id: string;
    title: string;
    createdAt: Date;
    modifiedAt: Date;
    postedAt: Date;
    body: string;
    teaser: string;
    published: boolean;
}