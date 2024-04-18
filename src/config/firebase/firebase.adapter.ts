import * as admin from 'firebase-admin';

const serviceAccount = require('./rush-loco-firebase-adminsdk-woowm-bebaae6d4a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export class FirebaseAdmin {

  private readonly auth: admin.auth.Auth;

  constructor() {
    this.auth = admin.auth();
  }

  async createUser(email: string, password: string, displayName?: string): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.createUser({
        email: email,
        password: password,
        displayName: displayName // Opcional: nombre para mostrar
      });
      return userRecord;
    } catch (error) {
      throw error; // Re-lanza el error para su manejo adecuado
    }
  }

  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken | null> {
    try {
      const decodedUserInfo = await this.auth.verifyIdToken(idToken);
      return decodedUserInfo;
    } catch (error) {
      console.error('Error al verificar token:', error);
      return null; // Maneja el error y devuelve null si el token es inválido
    }
  }

}
