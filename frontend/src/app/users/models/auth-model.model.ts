/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IAuthModel {
    app_metadata: any;
    blocked: boolean;
    created_at: Date;
    email: string;
    email_verified: boolean;
    emails: [];
    family_name: string;
    givent_name: string;
    identities: [];
    last_ip: string;
    last_login: Date;
    last_password_reset: Date;
    logins_count: number;
    multifactor: string;
    name: string;
    nickname: string;
    phone_number: string;
    phone_verified: string;
    picture: string;
    updated_at: Date;
    user_id: string;
    user_metadata: any;
    username: string;
}