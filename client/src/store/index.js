import { proxy } from "valtio";
const state = proxy({
    intro: true,
  isLoggedIn: false,
  userData: {},
});

export default state;
