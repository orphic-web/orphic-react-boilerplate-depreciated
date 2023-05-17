import Roles from '@/models/enums/Roles';
import VisibilityStates from '@/models/enums/VisibilityStates';

type User = {
    /** The id of the Firestore user document and Firebase Auth user. */
    id: string,

    /** The user's contact email and login credential. */
    email: string,

    /** The full display name of the User. */
    name: string,

    /** The date at which the User was created. */
    createdDate: Date,

    /** The user's app roles */
    role: Roles,

    visibility: VisibilityStates,
}

export default User;