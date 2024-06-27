// import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
// import { FC, useState } from "react";
// import PhoneInputWithCountrySelect from "react-phone-number-input";

// const CountrySelectorInput: FC<{ onChange: (value: string) => void }> = ({
//   onChange,
// }) => {
//   const [phoneValue, setPhoneValue] = useState("");

//   const handleOnChange = (value: string) => {
//     setPhoneValue(value);
//     onChange(value);
//   };

//   const handleCountryCodeChange = (country: CountryCode) => {
//     const code = getCountryCallingCode(country);
//     if (code) {
//       setPhoneValue(`+${code}`);
//       onChange(`+${code}`);
//     }
//   };

//   return (
//     <PhoneInputWithCountrySelect
//       country={"us"}
//       value={phoneValue}
//       onChange={handleOnChange}
//       enableSearch={true}
//       preferredCountries={["us", "gb", "ru"]}
//       onlyCountries={[
//         "us",
//         "gb",
//         "ru",
//         "ca",
//         "au",
//         "de",
//         "fr",
//         "in",
//         "jp",
//         "cn",
//       ]}
//       inputProps={{
//         name: "phone",
//         required: true,
//         autoFocus: true,
//       }}
//       dropdownClass="custom-dropdown"
//       containerClass="custom-container"
//       inputClass="custom-input"
//       buttonClass="custom-button"
//       onSelectFlag={handleCountryCodeChange}
//     />
//   );
// };

// export default CountrySelectorInput;
// import React, { useState } from 'react';
// // import PhoneInput, Value  from 'react-phone-input-2';
// import PhoneInput from 'react-phone-input-2'
// import Value from 'react-phone-input-2'

// const CountryCodeSelector: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
//   const [phoneValue, setPhoneValue] = useState<string>('');

//   const handleOnChange = (value: string) => {
//     setPhoneValue(value);
//     onChange(value);
//   };

//   return (
//     <PhoneInput
//       country={'us'}
//       value={phoneValue}
//       onChange={(value: string, _: any) => handleOnChange(value)}
//       enableSearch={true}
//       preferredCountries={['us', 'gb', 'ru']} // Add your preferred countries here
//       onlyCountries={['us', 'gb', 'ru', 'ca', 'au', 'de', 'fr', 'in', 'jp', 'cn']} // Limit the list to desired countries
//       inputProps={{
//         name: 'phone',
//         required: true,
//         autoFocus: true,
//       }}
//       dropdownClass="custom-dropdown"
//       containerClass="custom-container"
//       inputClass="custom-input"
//       buttonClass="custom-button"
//     />
//   );
// };

// export default CountryCodeSelector;
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CountryCodeSelector: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [phoneValue, setPhoneValue] = useState<string>('');

  const handleOnChange = (value: string) => {
    setPhoneValue(value);
    onChange(value);
  };

  return (
    <PhoneInput
      country={'us'}
      value={phoneValue}
      onChange={(value: string) => handleOnChange(value)}
      enableSearch={true}
    //   preferredCountries={['us', 'gb', 'ru']} // Add your preferred countries here
    //   onlyCountries={['us', 'gb', 'ru', 'ca', 'au', 'de', 'fr', 'in', 'jp', 'cn', 'am']} // Limit the list to desired countries
      inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true,
      }}
      dropdownClass="custom-dropdown"
      containerClass="custom-container"
      inputClass="custom-input"
      buttonClass="custom-button"
    />
  );
};

export default CountryCodeSelector;
