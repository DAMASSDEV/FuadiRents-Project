import { useState } from "react";
import Input from "../components/Input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white flex justify-between items-center">
      {/* Left Columns */}
      <div className="flex flex-col">
        <p className="font-bold text-4xl text-[#3563E9] ml-[72px] mt-[45px] text-left">
          FuaDiRents
        </p>
        <p className="font-normal text-5xl text-black ml-[72px] mt-[272px] text-left">
          Welcome to FuaDiRents
          <br />
          Sign into your account
        </p>
        <Input
          type="email"
          placeholder="Email"
          onChange={(err) => {
            setEmail(err.target.value);
          }}
          value={email}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(err) => {
            setPassword(err.target.value);
          }}
          value={password}
        />
      </div>

      {/* Right Columns */}
      <div></div>
    </div>
  );
};

export default SignIn;