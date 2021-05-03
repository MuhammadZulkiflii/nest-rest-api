import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Mahasiswa } from './schema';
import * as admin from 'firebase-admin';
@Injectable()
export class AppService {
  private firestore: admin.firestore.Firestore;
  constructor() {
    admin.initializeApp();
    this.firestore = admin.firestore();
  }
  async createMahasiswa(body: Mahasiswa): Promise<Mahasiswa> {
    try {
      await this.firestore
        .collection('mahasiswa')
        .doc(body.stambuk)
        .create(body);
      return body;
    } catch (error) {
      if (error.code === 6) {
        throw new UnprocessableEntityException(
          `${body.stambuk} telah terdaftar`,
        );
      }
      throw new HttpException(error.message, 403);
    }
  }
}
