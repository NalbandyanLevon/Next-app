"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import Cookies from "js-cookie";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [token, setToken] = useState(Cookies.get("token"));
  useEffect(() => {
    if (token) {
      Cookies.remove("token");
    }
  }, [Cookies.get("token")]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log(token);
      Cookies.set(`token`, `${token}`, { path: "/" });
      router.push("/products");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      <Link href={"/signup"}>Sign up</Link>
    </div>
  );
};

export default LoginPage;
