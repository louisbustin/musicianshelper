export default interface IProfile {
    _id: string;
    name: string;
    email: string;
    useAuthProfilePic: boolean;
    ssoProfilePicLink: string;
    profilePic: {
        data: {
            data: []
        };
        contentType: string;
    };
    owner: string;
    zip: string;
} 
