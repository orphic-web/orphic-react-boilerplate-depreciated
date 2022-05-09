import { auth, db } from '../FirebaseConfig';
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

  register = async (dispatch: any, name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const firebaseUser = await auth.createUserWithEmailAndPassword(email, password);
      // const createUserAccount = functions.httpsCallable('user-createUserAccount');
      // await createUserAccount({ user: newUser });

      console.log(firebaseUser);
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
