import {
  Button,
  Container,
  Image,
  Input,
  Text,
  Modal,
  Loading,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const SignUp = () => {
  const router = useRouter();
  const registrationData = { email: "", password: "", retypePassword: "" };
  const [value, setValue] = useState(registrationData);
  const [formValidate, setFormValidate] = useState({
    isEmailValidate: true,
    hasPassword: true,
    isPasswordValid: true,
    isPasswordSame: true,
  });
  const [alert, setAlert] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  const { isEmailValidate, hasPassword, isPasswordValid, isPasswordSame } =
    formValidate;

  const handleRegistration = async (e: any) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateData = (value: any) => {
    const emailValidation = (email: string) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };

    if (!emailValidation(value.email)) {
      setFormValidate((prev) => {
        return { ...prev, isEmailValidate: false };
      });
      return "invalidEmail";
    }

    if (!value.password || value.password.length < 6) {
      setFormValidate((prev) => {
        return {
          ...prev,
          hasPassword: !!value.password,
          isPasswordValid: false,
        };
      });
      return !value.password ? "noPassword" : "invalidPassword";
    }

    if (value.retypePassword !== value.password) {
      setFormValidate((prev) => {
        return { ...prev, isPasswordSame: false };
      });
      return "mismatchedPassword";
    }
  };

  const handleSubmit = async (e: any) => {
    const alertValue = validateData(value);

    switch (alertValue) {
      case "invalidEmail":
        setAlert("email is not valid");
        return;
      case "noPassword":
        setAlert("password is empty!");
        return;
      case "invalidPassword":
        setAlert("Password should be at least 6 characters");
        return;
      case "mismatchedPassword":
        setAlert("Passwords didn’t match. Try again.");
        return;
    }

    setVisible(true);
    const res = await fetch("/api/register", {
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { data, error } = await res.json();

    setModalStatus(() => {
      return error
        ? error
        : `Thank you for signing up! Please check your <p style="font-weight:bold"> ${data.user.email} </p> inbox to verify your e-mail address.`;
    });

    setValue((prev) => {
      if (!error) {
        return { ...prev, email: "", password: "", retypePassword: "" };
      }
      return prev;
    });
  };

  const handleModalClose = () => {
    setVisible(false);
    setModalStatus("");
    setAlert("");
  };

  const isInvalidForm =
    !isEmailValidate || !hasPassword || !isPasswordValid || !isPasswordSame;

  return (
    <Container>
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
              alignItems: "center",
            }}
          >
            <Input
              width="100%"
              placeholder="Email Address"
              onChange={handleRegistration}
              name="email"
              value={value.email}
            />
            <Input
              width="100%"
              placeholder="Password"
              onChange={handleRegistration}
              name="password"
              value={value.password}
            />
            <Input
              width="100%"
              name="retypePassword"
              onChange={handleRegistration}
              placeholder="Retype Password"
              value={value.retypePassword}
            />
          </Container>
          <Image width="20px" src="/assets/faq.png" alt="faq" />
        </Container>
        {isInvalidForm ? (
          <Text css={{ margin: 0 }} color="aqua">
            {alert}
          </Text>
        ) : (
          <Text css={{ margin: 0, height: 20 }}></Text>
        )}

        <Button
          css={{ margin: "20px 0px", width: "200px" }}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Container>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={handleModalClose}
        width={"600px"}
        css={{ height: "300px", justifyContent: "center" }}
      >
        <Modal.Header css={{ fontSize: "24px" }}>
          {modalStatus ? (
            <Text dangerouslySetInnerHTML={{ __html: modalStatus }}></Text>
          ) : (
            <Loading />
          )}
        </Modal.Header>
      </Modal>
    </Container>
  );
};

export default SignUp;
