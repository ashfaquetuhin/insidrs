import { Button, Container, Link, Text } from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Join = () => {
  const router = useRouter();
  return (
    <Container
      css={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "$black",
      }}
    >
      <Text color="$white">Welcome to</Text>
      <Text color="$white" h1>
        Insidrs
      </Text>

      <Button
        onClick={() => {
          router.push("/signup");
        }}
      >
        Join
      </Button>
      {/* </Link> */}
    </Container>
  );
};

export default Join;
