import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { authProvider } from "../../services/authService";

function Login() {
  const [secretToken, setSecretToken] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const submitButton = useRef<HTMLElement | null>(null);

  const submitCredentials = async () => {
    if (submitButton.current) {
      submitButton.current.setAttribute("disabled", "true");
    }
    const resp = await authProvider.getToken({
      username,
      region,
      accessToken: accessKey,
      secretAccessKey: secretToken,
    });
    if (submitButton.current) {
      submitButton.current.removeAttribute("disabled");
    }
    console.log(resp);
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter necessary credentials to connect with S3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitCredentials();
            }}
            className="flex flex-col gap-2"
          >
            <Label htmlFor="secretToken">Secret Token</Label>
            <Input
              onChange={(e) => setSecretToken(e.target.value)}
              value={secretToken}
              type="text"
              id="secretToken"
            />
            <Label htmlFor="accessKey">Access Key</Label>
            <Input
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              type="text"
              id="accessKey"
            />
            <Label htmlFor="region">Region</Label>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              type="text"
              id="region"
            />
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
            />
            <Button type="submit" ref={submitButton} className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
