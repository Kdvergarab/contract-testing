import { Verifier } from '@pact-foundation/pact';
import { app } from './app.js'; // Asegúrate de que esta ruta sea correcta

const SERVER_PORT = 3000;

// Iniciar el servidor del proveedor antes de ejecutar las pruebas
const server = app.listen(SERVER_PORT, () => {
  console.log(`Proveedor ejecutándose en http://localhost:${SERVER_PORT}`);
});

const opts = {
  provider: 'ProductService',
  providerBaseUrl: `http://localhost:${SERVER_PORT}`,
  pactBrokerUrl: 'https://qsnttdata.pactflow.io',
  pactBrokerToken: 'fJ_VDL6aFTxTIyfUG4SV_Q',
  consumerVersionSelectors: [{ tag: 'master', latest: true }]
};

async function verifyPacts() {
  try {
    const verifier = new Verifier(opts);
    await verifier.verifyProvider();
    console.log('Contrato validado con éxito.');
  } catch (error) {
    console.error('Error al validar el contrato:', error);
  } finally {
    server.close();
  }
}

verifyPacts();
