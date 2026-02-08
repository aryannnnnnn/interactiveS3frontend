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

function Login() {
  const setToken = useStore(useLoginState, (state) => state.setToken);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({});

  const submitCredentials = async (data: ILogin) => {
    try {
      console.log(data);
      const resp = await authProvider.getToken(data);
      if (resp.token) {
        console.log(resp.token);
        setToken(resp.token);
        navigate({ pathname: "/" });
      }
    } catch (e) {
      console.error(e);
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
            {errors.secretAccessKey && (
              <p className="text-red-500">{errors.secretAccessKey.message}</p>
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
            <Button type="submit" className="w-full">
              Login
            </Button>
            {errors.root && (
              <p className="text-red-500">{errors.root.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
