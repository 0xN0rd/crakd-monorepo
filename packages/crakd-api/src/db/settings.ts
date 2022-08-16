import Settings from '../models/settings';
import User from '../models/user';

export const getSettings = async (): Promise<any> => {
    const settings = await Settings.findOne({});
    return settings;
};

export const updateProfile = async (
    id: string,
    fullName: string,
    username: string,
    gamertag: string,
    city: string,
    state: string,
    country: string
): Promise<any> => {
    const user = await User.findOneAndUpdate(
        { _id: id },
        { fullName, username, gamertag, city, state, country },
        { new: true }
    );
    
    return user;
};

export const updatePassword = async (id: string, password: string): Promise<any> => {
    const user = await User.findOneAndUpdate({ _id: id }, { password }, { new: true });
    return user;
};

export const settingsCreateUser = async (
    fullName: string,
    email: string,
    password: string,
    gamertag: string,
    role: string
): Promise<any> => {
    const user = await User.create({
        fullName,
        email,
        password,
        gamertag,
        role,
        emailVerified: true,
    });
    return user;
};