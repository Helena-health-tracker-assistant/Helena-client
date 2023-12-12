import { loginUrl, registerUrl, registerProfileUrl } from "./fetchUrl";
import { Login, Profile, Register } from "../interfaces/interface";

export const fetchLogin = async (values: Login) => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(values);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchRegister = async (values: Register) => {
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(values);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchRegisterProfile = async (values: Profile) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(registerProfileUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
