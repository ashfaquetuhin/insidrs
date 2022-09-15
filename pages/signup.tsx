import { Button, Container, Image, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const registrationData = { email: "", password: "" };
  const [value, setValue] = useState(registrationData);

  const handleRegistration = (e) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    console.log({ value });
  };

  return (
    <Container
      css={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$black",
        gap: 20,
      }}
    >
      <Container css={{ display: "flex", width: "500px" }}>
        <Container
          css={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 0,
          }}
        >
          <Input
            placeholder="Email Address"
            onChange={handleRegistration}
            name="email"
          />
          <Input
            placeholder="Password"
            onChange={handleRegistration}
            name="password"
          />
          <Input placeholder="Retype Password" />
        </Container>
        <Image width="20px" src="/assets/faq.png" alt="faq" />
      </Container>
      <Button onClick={handleSubmit}>Register</Button>
    </Container>
  );
};

export default SignUp;
