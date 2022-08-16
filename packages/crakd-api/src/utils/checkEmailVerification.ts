import { getSettings } from '../db';

export const checkEmailVerification = async () => {
    const settings = await getSettings();
    const isEmailVerificationRequired = settings
        ? settings.isEmailVerificationRequired
        : false;
    
    return isEmailVerificationRequired;
};