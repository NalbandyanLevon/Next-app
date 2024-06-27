"use client";

import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });
    console.log(router);

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    Cookies.remove("authToken");
    router.push("/login");
  };

  return (
    <div>
      <h1>Защищенная страница</h1>
      {user && <p>Добро пожаловать, {user.displayName}</p>}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ProtectedPage;
