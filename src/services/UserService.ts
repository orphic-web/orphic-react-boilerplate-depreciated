import { auth, db, functions } from '../FirebaseConfig';
import { logout } from '../store/slices/UserSlice';

class UserService {
  login = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };

  createFirebaseUser = async (email: string, name: string, password: string, passwordConfirmation: string) => {
    try {
      const firebaseUser = await auth.createUserWithEmailAndPassword(email, password);
      return firebaseUser;
    } catch (e: any) {
      console.log(e.message);
      throw e.message;
    }
  };

  createFirestoreUser = async (id:string, email: string, name: string) => {
    try {
      const createUser = functions.httpsCallable('user-createUser');
      const createUserResponse = await createUser({ id, email, name });
      return createUserResponse;
    } catch (e: any) {
      console.log(e.message);
      throw e.message;
    }
  };

  logout = async (dispatch: any) => {
    try {
      const resp = await auth.signOut();
      console.log(resp);
      dispatch(logout());
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };

  getAdmin = async () => {
    try {
      let admin = {};
      const docRef = await db.collection('Users').where('permission', '==', 'admin').get();

      docRef.docs.forEach((doc: any) => {
        admin = doc.data();
      });

      return admin;
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };

  updateAdmin = async (newAdmin: any) => {
    try {
      await db.collection('Users').doc(newAdmin.id).update({
        ...newAdmin,
      });
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };
}

const userService = new UserService();
export default userService;
