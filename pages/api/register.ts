import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

type Data = {
  name: string;
};

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  const user = await supabase.auth.getUser();

  console.log({ user, data });

  //@ts-ignore

  if (error) return res.status(401).json({ error: error.message });

  //@ts-ignore
  return res.status(200).json({ data: data, status: "ok" });
}
