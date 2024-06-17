import path from "path";
import {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} from "@pact-foundation/pact";
// import { API } from "./api";
import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const { eachLike, like } = MatchersV3;

const expect = chai.expect;
chai.use(chaiAsPromised);

const provider = new PactV3({
  consumer: "FrontendWebsite",
  provider: "ProductService",
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "warn",
  dir: path.resolve(process.cwd(), "pacts"),
  spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
  host: "127.0.0.1"
});

describe("API Pact test", () => {
  describe("getting all products", () => {
    it("products exists", async () => {
      // set up Pact interactions
       provider.addInteraction({
        states: [{ description: "products exist" }],
        uponReceiving: "get all products",
        withRequest: {
          method: "GET",
          path: "/resources",
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: eachLike({ id: 1, name: 'Resource 1', type: 'Type 1' }),
        },
      });

      await provider.executeTest(async (mockService) => {
        const response = await axios.get(`${mockService.url}/resources`, {
          headers: { Accept: 'application/json' },
        });
        
      // Validación de la estructura de la respuesta
      expect(response.data[0]).to.have.property('id');
      expect(response.data[0]).to.have.property('name');

      // Validación de los tipos de datos
      expect(response.data[0].id).to.be.a("number");
      expect(response.data[0].name).to.be.a('string');

        expect(response.data[0]).to.deep.equal(
          {
            id: 1,
            name: 'Resource 1',
            type: 'Type 1',
          },
        );
      });
    });
  });

});