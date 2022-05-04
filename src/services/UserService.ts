import { newspaper } from 'ionicons/icons';
import { db } from '../FirebaseConfig';

class UserService {
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
