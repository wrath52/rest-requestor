import RestRequestor from "../source/index";

const BASE_URL = "/api";
const Requestor = new RestRequestor(BASE_URL);

(async () => {
  const response = await Requestor.execute("/news");
  console.log(response);
})();
