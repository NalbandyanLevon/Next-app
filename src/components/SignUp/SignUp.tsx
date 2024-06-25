"use client";

import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await newUserCredential.user.getIdToken();
      Cookies.set(`token`, `${token}`, { path: "/" });
      router.push("/products");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
