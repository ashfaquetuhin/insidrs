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
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  console.log({ value });

  const [visible, setVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("");

  useEffect(() => {
    const getSessionData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const result = await supabase.auth.getUser();

      if (!result.data.user) return;

      if (error) {
        throw error;
      }

      if (data.session?.access_token) {
        const { user } = data.session;
        router.push(`/user/${user.id}`);
      }
    };

    getSessionData();
  }, [router.asPath, router]);

  const handleRegistration = async (e: any) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    if (value.password && value.retypePassword !== value.password) {
      setIsPasswordSame(false);
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
  };

  const handleModalClose = () => {
    setVisible(false);
    setValue((prev) => {
      return { ...prev, email: "", password: "", retypePassword: "" };
    });
    setModalStatus("");
  };

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
        {isPasswordSame ? (
          <Text css={{ margin: 0 }}></Text>
        ) : (
          <Text css={{ margin: 0 }} color="tomato">
            Passwords didn’t match. Try again.
          </Text>
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
