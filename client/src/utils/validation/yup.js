import * as yup from "yup";

export const registerAccountSchemaForCompany = yup
  .object({
    email: yup.string().email("this field must be an email").required().trim(),
    password: yup
      .string()
      .min(6, "must be more than 6 charterer .")
      .max(10, "max length is 10")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match")
      .required(),
    fullName: yup.string().required(),
    userName: yup.string().required(),
  })
  .required();

export const registerAccountSchemaForTalent = yup
  .object({
    email: yup.string().email("this field must be an email").required().trim(),
    password: yup
      .string()
      .min(6, "must be more than 6 charterer .")
      .max(10, "max length is 10")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match")
      .required(),
    fullName: yup.string().required(),
  })
  .required();

export const sinIn = yup
  .object({
    email: yup.string().email("this field must be an email").required().trim(),
    password: yup
      .string()
      .min(6, "must be more than 6 charterer .")
      .max(10, "max length is 10")
      .required(),
  })
  .required();

export const forgotyup = yup
  .object({
    email: yup.string().email("this field must be an email").required().trim(),
  })
  .required();

export const changePassword = yup
  .object({
    password: yup
      .string()
      .min(6, "must be more than 6 charterer .")
      .max(10, "max length is 10")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match")
      .required(),
  })
  .required();

export const UpdateUserTalent = yup
  .object({
    userName: yup.string().required("Jop Title is required"),
    description: yup.string().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
    birthData: yup.object().required("barthDate is required"),
    experienceLevel: yup.array().min(1),
    jobTyp: yup.array().min(1),
    languages: yup.array().min(1),
    skills: yup.array().min(1),
    Availability: yup.string().required(),
  })
  .required();

export const UpdateUserCompany = yup
  .object({
    userName: yup.string().required("Contact person Name is required"),
    description: yup.string().required(),
    phone: yup.string().required(),
    country: yup.string().required(),
    website: yup.string().required(),
    noOfEmployees: yup.number().required("Number of Employees is required"),
    typeOfBusiness: yup.string().required("type of Business is required"),
    address: yup.string().required(),
    country: yup.string().required(),
    YearEstablishes: yup.string().required("Year Establishes is required"),
  })
  .required();

export const SettingUser = yup
  .object({
    email: yup.string().email("this field must be an email").required().trim(),
    password: yup.string().max(10, "max length is 10"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match"),
    fullName: yup.string().required(),
  })
  .required();
