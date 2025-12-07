import { create } from "zustand";

export type ContributorFormStore = {
  formHook: any;
};

const initialStore: ContributorFormStore = {
  formHook: null,
};

// We wil use this store to check in articles preview if form is valid
// This scenario is encountered when user/contributor is creating a new or editing a new article
export const useContributorFormStore = create<ContributorFormStore>()(
  (set) => ({
    ...initialStore,
  }),
);

export const setContributorFormHook = (formHook: any) =>
  useContributorFormStore.setState({ formHook });
