export enum PasswordStrength {
    Short = 0,
    Valid = 1,
}

export class PasswordCheckService {
    private static readonly MINIMUM_LENGTH = 8;

    public static checkPasswordStrength(password: string | null | undefined): PasswordStrength {
        if (!password || password.length < this.MINIMUM_LENGTH) {
            return PasswordStrength.Short;
        }
        return PasswordStrength.Valid;
    }
}

export const getPasswordStrength = (password: string | null | undefined): PasswordStrength => {
    return PasswordCheckService.checkPasswordStrength(password);
};
