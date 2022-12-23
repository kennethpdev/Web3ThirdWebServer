import { FastifyPluginAsync } from 'fastify';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';
import { LoginPayload } from '@thirdweb-dev/sdk/dist/declarations/src';
import initializeFirebaseServer from '../../../lib/firebase';

interface BodyType {
  payload: LoginPayload;
}

const login: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: BodyType }>(
    '/login',
    async (req, res): Promise<object> => {
      const domain: string = process.env.LOGIN_DOMAIN || '';
      const sdk = new ThirdwebSDK('mumbai');

      let address;
      try {
        address = sdk.auth.verify(domain, req.body.payload);
      } catch (err) {
        console.error(`Error verifying address`, (err as Error).message);
        return res.status(401).send('Unauthorized');
      }

      const { auth } = initializeFirebaseServer();
      const token: string = await auth.createCustomToken(address);
      return { token };
    }
  );
};

export default login;
