import {
  Container,
  Image,
  Card,
  Grid,
  Text,
  Link,
  Navbar,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const UserProfile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ id: "", email: "" });
  const userName = "User Name";
  const chanelName = "Chanel Name";
  const bio = "A short bio of the user";
  const videoId = "dBFW8OvciIU";

  const collapseItems = [
    "Home",
    "Profile",
    "Squads",
    "Boards",
    "Login",
    "Sign Up",
  ];

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
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "lavender",
        gap: 40,
      }}
    >
      <Container css={{ mw: "650px" }}>
        <Navbar isBordered variant="sticky">
          <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" />
          </Navbar.Brand>
          <Navbar.Content
            enableCursorHighlight
            hideIn="xs"
            variant="underline"
          ></Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={item}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href="#"
                >
                  {item}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <Card css={{ mw: "600px", background: "black", padding: 20 }}>
        <Container
          css={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Image
            width={320}
            height={180}
            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
            alt="Default Image"
            objectFit="cover"
          /> */}
          <iframe
            width="100%"
            height="338px"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
          <Text color="$white">{userName}</Text>
          <Text color="$white">{chanelName}</Text>
          <Text color="$white">{bio}</Text>
          <Container
            display="flex"
            css={{
              flexDirection: "row",
              gap: 40,
              justifyContent: "center",
            }}
          >
            <Grid>
              <Image
                css={{
                  height: "40px",
                  width: "40px",
                  margin: "0px",
                }}
                src="/assets/movie.svg"
                alt="youtube"
              />
            </Grid>
            <Grid>
              <Image
                css={{
                  height: "40px",
                  width: "40px",
                  margin: "0px",
                }}
                src="/assets/tiktok-square.svg"
                alt="tiktok"
              />
            </Grid>
            <Grid>
              <Image
                css={{
                  height: "40px",
                  width: "40px",
                  margin: "0px",
                }}
                src="/assets/instagram.svg"
                alt="instagram"
              />
            </Grid>
          </Container>
        </Container>
      </Card>
      <Card css={{ mw: "600px" }}>
        <iframe
          height="338px"
          src={`https://www.youtube.com/embed/${videoId}`}
        ></iframe>
      </Card>
    </Container>
  );
};

export default UserProfile;
