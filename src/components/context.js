import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  auth: false,
  loading: false,
  userId: "",
  messages: [],
  EditingEntry: {},
  success: false,
});

export { useGlobalState, setGlobalState };
