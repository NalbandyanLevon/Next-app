"use client";

import { auth, provider } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "@firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

const GoogleSignUp = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const authToken = credential?.accessToken;
      const user = result.user;
      console.log(user);

      if (authToken) {
        Cookies.set("authToken", authToken, { expires: 7 });
      }
      router.push("/");
    } catch (error) {
      console.error(error, "error");
    }
  };

  useEffect(() => {
    if (Cookies.get("authToken")) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push("/protected");
        }
      });
    }
  }, [router]);

  return (
    <div>
      vayti s pomoshu google
      <button onClick={handleLogin}>Vayti</button>
    </div>
  );
};

export default GoogleSignUp;
