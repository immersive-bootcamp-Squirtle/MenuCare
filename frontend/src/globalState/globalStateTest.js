import { atom } from "recoil";

export const globalStateTest = atom({
  key: "globalStateTest", // unique ID (with respect to other atoms/selectors)
  default: "test",
});
