import { Container, Loading } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const VerifyToken = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const result = await supabase.auth.getUser();
      setUser(result?.data?.user);
    };
    getUser();

    if (user) {
      router.push(`/user/${user.id}`);
    }
  }, [router, user]);

  return (
    <Container
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading color={"success"} />
    </Container>
  );
};

export default VerifyToken;
