import Permissions from './enums/Permissions';

type User = {
    id: string,
    email: string,
    name: string,
    phone?: string,
    birthDate?: string,
    language: string,
    permission: Permissions,
}

export default User;
