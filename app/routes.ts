import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("phone-number", "routes/phone-number.tsx"),
  route("verify-phone-number", "routes/verify-phone-number.tsx"),
  route("personal-details", "routes/personal-details.tsx"),
  route("create-password", "routes/create-password.tsx"),
] satisfies RouteConfig;
