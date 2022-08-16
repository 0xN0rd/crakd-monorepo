export interface SocialProfile {
    id?: string;
    facebookId?: string;
    googleId?: string;
    fullName?: string;
    email?: string;
    gamertag?: string;
    city?: string;
    state?: string;
    country?: string;
}

export const getUserInfoFromFacebook = (profile: any): SocialProfile => {
    const user = {
        facebookId: profile.id,
        fullName: '',
        email: '',
    };

    const firstName = profile.name && profile.name.givenName ? profile.name.givenName : '';
    const lastName = profile.name && profile.name.familyName ? profile.name.familyName : '';

    if (firstName && lastName) {
        user.fullName = `${firstName} ${lastName}`;
    } else if (firstName && !lastName) {
        user.fullName = firstName;
    } else if (lastName && !firstName) {
        user.fullName = lastName;
    } else if (profile.displayName) {
        user.fullName = profile.displayName;
    } else if (profile._json.name) {
        user.fullName = profile._json.name;
    }

    user.email = profile.emails && profile.emails.length > 0 && profile.emails[0].value !== undefined ? profile.emails[0].value : '';
    
    return user;
};

export const getUserInfoFromGoogle = (profile: any): SocialProfile => {
    const user = {
        googleId: profile.id,
        fullName: '',
        email: '',
    };

    const firstName = profile.name && profile.name.givenName ? profile.name.givenName : '';
    const lastName = profile.name && profile.name.familyName ? profile.name.familyName : '';

    if (firstName && lastName) {
        user.fullName = `${firstName} ${lastName}`;
    } else if (firstName && !lastName) {
        user.fullName = firstName;
    } else if (lastName && !lastName) {
        user.fullName = lastName;
    } else if (profile.displayName) {
        user.fullName = profile.displayName;
    } else if (profile.name) {
        user.fullName = profile.name;
    }

    user.email = (profile.emails && profile.emails.length > 0 && profile.emails[0].value) || '';

    return user;
};
