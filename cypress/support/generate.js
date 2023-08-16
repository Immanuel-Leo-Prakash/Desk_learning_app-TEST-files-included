import { build, fake } from "test-data-bot";

const buildUser = build("User").fields({
  username: fake((f) => f.internet.userName()),
});
export { buildUser };
