import { Button, Container, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const UserProfile = () => {
  type UserInfo = {
    id: string;
    email: string | undefined;
  };

  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: "", email: "" });
  // const [hasUser, setUser] = useState(false);

  console.log("user page");
  useEffect(() => {
    const getSessionData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (!data.session) {
        return;
      }

      const user = data.session?.user;

      console.log({ user, data, error });

      //@ts-ignore
      const { id, email } = user;
      setUserInfo((prev) => {
        return { ...prev, id: id, email: email };
      });
    };

    getSessionData();
  }, [userInfo.id]);

  const signOut = async () => {
    const result = await supabase.auth.signOut();
    setUserInfo((prev) => {
      return { ...prev, id: "", email: "" };
    });
    console.log({ result });
  };

  console.log({ userInfo });

  return (
    <Container
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {userInfo.id ? (
        <>
          <Text color="$white">user email - {userInfo.email}</Text>
          <Text color="$white">user Id - {userInfo.id}</Text>
          <Button onClick={signOut}>
            <Text color="aqua"> sign out</Text>
          </Button>
        </>
      ) : (
        <Text color="aqua">User is not found!</Text>
        // <SignIn />
      )}
    </Container>
  );
};

export default UserProfile;
