// // src/app/auth/page.tsx

// "use client";

// import { useState, useEffect } from "react";
// import {
//   auth,
//   signInWithPhoneNumber,
//   signInWithCredential,
//   PhoneAuthProvider,
// } from "@/firebaseConfig";
// import { RecaptchaVerifier } from "@firebase/auth";
// import { useRouter } from "next/navigation";

// declare global {
//   interface Window {
//     recaptchaVerifier: RecaptchaVerifier;
//   }
// }

// const PhoneSignUp: React.FC = () => {
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [verificationCode, setVerificationCode] = useState<string>("");
//   const [verificationId, setVerificationId] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: 'invisible' ,
//         callback: (response: any) => {
//           console.log("Recaptcha solved");
//         },
//       }
//     );
//   }, []);

//   const requestVerificationCode = async () => {
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         phoneNumber,
//         appVerifier
//       );
//       setVerificationId(confirmationResult.verificationId);
//       console.log("Verification code sent");
//     } catch (error) {
//       console.error("Error during signInWithPhoneNumber:", error);
//     }
//   };

//   const verifyCode = async () => {
//     if (!verificationId || !verificationCode) {
//       console.error("Verification ID or code is missing");
//       return;
//     }

//     const credential = PhoneAuthProvider.credential(
//       verificationId,
//       verificationCode
//     );
//     try {
//       await signInWithCredential(auth, credential);
//       console.log("User signed in successfully");
//       router.push("/protected");
//     } catch (error) {
//       console.error("Error during signInWithCredential:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Войти с помощью номера телефона</h1>
//       <input
//         type="text"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         placeholder="Введите номер телефона"
//       />
//       <div id="recaptcha-container"></div>
//       <button onClick={requestVerificationCode}>Отправить код</button>

//       {verificationId && (
//         <>
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             placeholder="Введите код подтверждения"
//           />
//           <button onClick={verifyCode}>Подтвердить код</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default PhoneSignUp;
// components/PhoneNumberInput.tsx

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import PhoneInput from "react-phone-number-input/input";
import {
  E164Number,
  isPossibleNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";
import CountryCodeSelector from "./CountrySelectorInput";

const PhoneSignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleOnChangeNumber = (str: string) => {
    setPhoneNumber(str);
  };

  const handleSubmit = async (values: any) => {
    console.log(values, "values");
    setLoading(true);
    if (!phoneNumber || !isValidPhoneNumber("+" + phoneNumber)) {
      message.error("Please enter a valid phone number!");
      setLoading(false);
      return;
    }

    const fullPhoneNumber = `+${phoneNumber}`;
    console.log(fullPhoneNumber, "fullPhoneNumber");
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("Recaptcha solved");
        },
      }
    );

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        recaptchaVerifier
      );
      setLoading(false);
      message.success("SMS с кодом отправлено на указанный номер.");
    } catch (error) {
      console.error("Error sending SMS:", error);
      setLoading(false);
      message.error(
        "Произошла ошибка при отправке SMS. Пожалуйста, попробуйте снова."
      );
    }
  };

  return (
    <div>
      <Form name="phone_number_form" onFinish={handleSubmit}>
        <CountryCodeSelector onChange={handleOnChangeNumber} />
        <Form.Item style={{ display: "inline-block", width: "20%" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Отправить SMS
          </Button>
        </Form.Item>
      </Form>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneSignUp;
