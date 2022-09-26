/** A controller that handles operations regarding Users on Firestore. */
abstract class HelloworldController {
  /**
     * Retrieves a Firestore User Document by id.
     *
     * @param {string} userId The query userId
     * @returns {Promise<string>} The corresponding User if found
     */
  static async helloworld(text: string): Promise<string> {
    const hello = `Hello world - ${text}`;

    console.log(hello);

    return hello;
  }
}

export default HelloworldController;
