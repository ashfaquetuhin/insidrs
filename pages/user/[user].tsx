import { Container, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const UserProfile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ id: "", email: "" });

  useEffect(() => {
    const getSessionData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      const user = data.session?.user;
      //@ts-ignore
      const { id, email } = user;
      setUserInfo((prev) => {
        return { ...prev, id: id, email: email };
      });
    };

    getSessionData();
  }, [router]);

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
      <Text color="$white">user email - {userInfo.email}</Text>
      <Text color="$white">user Id - {userInfo.id}</Text>
    </Container>
  );
};

export default UserProfile;
