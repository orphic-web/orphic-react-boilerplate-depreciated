import Visibility from './enums/Visibility';
import Team from './Team';

type Session = {
   /** The id of the Firestore Session document */
   id: string,

   /** Game id referes to the session played game */
   gameId: string,

   /** The involved team in the session */
   teams: Team[],

   /** The date at which the Session was created. */
   createdDate: Date,

   /** The date at which the Session was ended. */
   endDate: Date,

   /** The visibility of the session for other users */
   visibility: Visibility,
}

export default Session;
