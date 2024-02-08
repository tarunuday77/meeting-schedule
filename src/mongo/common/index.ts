import User from "./schema/User";
import Company from "./schema/Company";
import CompanyProduct from "./schema/CompanyProduct";
import CompanyUserPermission from "./schema/CompanyUserPermission";

export const ModelList = {
  User,
  Company,
  CompanyProduct,
  CompanyUserPermission,
};

export type ModelListType = typeof ModelList;
