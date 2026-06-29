 import fs from "fs";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar"
];

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");

async function authorize() {
  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  fs.writeFileSync(
    TOKEN_PATH,
    JSON.stringify(auth.credentials, null, 2)
  );

  console.log("✅ Login realizado com sucesso!");
  console.log("✅ token.json criado.");
}

authorize();