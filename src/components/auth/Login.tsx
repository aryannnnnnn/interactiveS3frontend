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
import { authProvider } from "../../services/authService";
import { useStore } from "zustand";
import { useLoginState } from "../../store/useLoginStore";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { ILogin } from "@/interfaces/login";
import { useState } from "react";

function Login() {
  const setToken = useStore(useLoginState, (state) => state.setToken);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({});

  const submitCredentials = async (data: ILogin) => {
    try {
      setServerError("");
      const resp = await authProvider.getToken(data);
      if (resp?.token) {
        setToken(resp.token);
        navigate({ pathname: "/" });
      } else {
        setServerError(resp?.data ?? "Login failed. Check your credentials.");
      }
    } catch (e) {
      setServerError("Unable to connect to the server.");
    }
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
            onSubmit={handleSubmit(submitCredentials)}
            className="flex flex-col gap-2"
          >
            <Label htmlFor="secretToken">Secret Token</Label>
            <Input
              type="text"
              {...register("secretAccessKey", {
                required: "Secret Key is required",
              })}
              id="secretToken"
            />
            {errors.secretAccessKey && (
              <p className="text-red-500">{errors.secretAccessKey.message}</p>
            )}
            <Label htmlFor="accessKey">Access Key</Label>
            <Input
              type="text"
              {...register("accessToken", {
                required: "Access Token is required",
              })}
              id="accessKey"
            />
            {errors.accessToken && (
              <p className="text-red-500">{errors.accessToken.message}</p>
            )}
            <Label htmlFor="region">Region</Label>
            <Input
              type="text"
              {...register("region", {
                required: "Region is required",
              })}
              id="region"
            />
            {errors.region && (
              <p className="text-red-500">{errors.region.message}</p>
            )}
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              id="username"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Connecting..." : "Login"}
            </Button>
            {serverError && (
              <p className="text-red-500 text-sm">{serverError}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
