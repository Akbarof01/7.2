import {  redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const inputData = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/local/register", inputData);
    console.log(response);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message || "Please verify the credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section>
    </section>
  );
};

export default Register;
