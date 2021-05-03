export default interface IProfile {
    _id: string;
    name: string;
    email: string;
    useAuthProfilePic: boolean;
    profilePic: {
        data: [];
        contentType: string;
    };
    owner: string;
} 
