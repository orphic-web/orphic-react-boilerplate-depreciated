import { WhereFilterOp } from 'firebase/firestore';

type QueryArg = {
   /** Property name we want to evaluate */
   property: string,

   /** The condition we want to check */
   condition: WhereFilterOp,

   /** The value that we want to evaluate */
   value: string,
}

export default QueryArg;
