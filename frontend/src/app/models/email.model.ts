export interface IEmail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
    sender?: string;
    replyTo?: string;
    inReplyTo?: string;
    references?: string;
    envelope?: string;
    attachDataUrls?: string;
    watchHtml?: string;
}