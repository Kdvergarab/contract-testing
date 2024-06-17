import path from 'path';
import { fileURLToPath } from 'url';
import pact from '@pact-foundation/pact-node';

// Obtener el nombre de archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a los archivos pact
const pactFilesOrDirs = path.resolve(__dirname, 'pacts');
const pactBrokerUrl = 'https://qsnttdata.pactflow.io';
const pactBrokerToken = 'fJ_VDL6aFTxTIyfUG4SV_Q';
const consumerVersion = '1.0.0';

const opts = {
  pactFilesOrDirs: [pactFilesOrDirs],
  pactBroker: pactBrokerUrl,
  pactBrokerToken: pactBrokerToken,
  consumerVersion: consumerVersion,
};

pact.publishPacts(opts)
  .then(() => {
    console.log('Pacts successfully published!');
  })
  .catch(e => {
    console.error('Failed to publish pacts:', e);
  });
