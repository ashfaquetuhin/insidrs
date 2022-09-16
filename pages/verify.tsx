import { Button, Container, Image, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const Verify = () => {
  //   const registrationData = { email: "", password: "" };
  //   const [value, setValue] = useState(registrationData);

  //   const handleRegistration = (e) => {
  //     setValue((prev) => {
  //       return {
  //         ...prev,
  //         [e.target.name]: e.target.value,
  //       };
  //     });
  //   };

  const handleSubmit = () => {
    console.log("Asdfads");
  };

  return (
    <Container
      css={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$$white",
        gap: 20,
      }}
    >
      <Container
        css={{
          display: "flex",
          maxWidth: "500px",
          flexWrap: "nowrap",
          gap: 10,
        }}
      >
        <Container
          css={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 0,
          }}
        >
          <text>
            A verification code has been sent to to the email you provided.
            Please enter the code below.
          </text>
          <Input placeholder="Enter verification code" />
        </Container>
      </Container>
      <Button onClick={handleSubmit}>Verify</Button>
    </Container>
  );
};

export default Verify;
