import { z } from "zod";
import { create } from "zustand";
import { registerFormSchema } from "./form-schema";
import { createJSONStorage, persist } from "zustand/middleware";

export type RegisterFormStore = {
  formValues: {
    id?: string;
    lastName: string;
    firstName: string;
    lastNamePhonetic: string;
    firstNamePhonetic: string;
    dateOfBirth: string;
    gender: string;
    postCode: string;
    prefecture: string;
    addressOne: string;
    addressTwo: string;
    addressThree: string;
    mobilePhoneNumber: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    uploadFile: File;
    uploadFileName: string;
    uploadFileURL: string;
    nickname: string;
    favoriteSport: string;
    favoriteGourmet: string;
    affiliateClubs: { id: string; name: string }[];
    advertiserFlag: boolean;
    advertiserName: string;
    rakutenId: string;
    isAdvertiser?: boolean;
    contributorFlag?: boolean;
    contributorStatus?: number;
    line_id?: string;
    x_id?: string;
    facebook_id?: string;
    instagram_id?: string;
  };
  currentLoginId: string;
  currentEmail: string;
};

const initialFormValues = {
  lastName: "",
  firstName: "",
  lastNamePhonetic: "",
  firstNamePhonetic: "",
  dateOfBirth: "2000/04/01",
  gender: "0",
  postCode: "",
  prefecture: "",
  addressOne: "",
  addressTwo: "",
  addressThree: "",
  mobilePhoneNumber: "",
  phoneNumber: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  uploadFile: new File([], ""),
  uploadFileName: "",
  uploadFileURL: "",
  nickname: "",
  favoriteSport: "",
  favoriteGourmet: "",
  affiliateClubs: [] as { id: string; name: string }[],
  advertiserFlag: false,
  advertiserName: "",
  rakutenId: "",
  contributorFlag: false,
  contributorStatus: 0,
};

export const useRegisterFromStore = create<RegisterFormStore>()(
  persist(
    (set, get) => ({
      formValues: initialFormValues,
      currentLoginId: "",
      currentEmail: "",
    }),
    {
      name: "user-form-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

type setFormValuesType = Omit<z.infer<typeof registerFormSchema>, "" | ""> & {
  uploadFileName: string;
  uploadFileURL: string;
  id?: string;
  line_id?: string;
  x_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  contributorStatus?: number;
};

export const setRegisterFormValues = (values: setFormValuesType) => {
  useRegisterFromStore.setState({
    formValues: {
      ...initialFormValues,
      ...values,
      advertiserName: values.advertiserName ?? "",
      uploadFile: values.uploadFile ?? new File([], ""),
      id: values.id ?? "",
      line_id: values.line_id ?? "",
      x_id: values.x_id ?? "",
      facebook_id: values.facebook_id ?? "",
      instagram_id: values.instagram_id ?? "",
      contributorStatus: values.contributorStatus ?? 0,
    },
  });
};

export const resetRegisterFormValues = () => {
  useRegisterFromStore.setState({
    formValues: initialFormValues,
    currentLoginId: "",
  });
};
