import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/authProvider";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuth, login, loginErrors, loading } = useAuth();
  const [formData, setFormData] = useState({
    data: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  if (isAuth) navigate("/home");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      login(formData);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#222831] p-4 text-[#EEEEEE]">
      <Card className="w-full max-w-md border-[#393E46] bg-[#222831] text-[#EEEEEE] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#FFD369]">Log In</CardTitle>
          <CardDescription className="text-[#EEEEEE]/70">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="data" className="text-[#EEEEEE]">
                Username or Email
              </Label>

              <Input
                id="data"
                placeholder="johndoe or john@example.com"
                required
                value={formData.data}
                onChange={handleChange}
                disabled={loading}
                className="border-[#393E46] bg-[#222831] text-[#EEEEEE] focus:border-[#FFD369] focus:ring-[#FFD369]/50"
              />

              {loginErrors.data &&
                loginErrors.data.map((err, i) => (
                  <p key={i} className="text-red-400">
                    {err}
                  </p>
                ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#EEEEEE]">
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-[#FFD369] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="border-[#393E46] bg-[#222831] text-[#EEEEEE] focus:border-[#FFD369] focus:ring-[#FFD369]/50"
              />

              {loginErrors.password &&
                loginErrors.password.map((err, i) => (
                  <p key={i} className="text-red-400">
                    {err}
                  </p>
                ))}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer border-none bg-[#FFD369] text-[#222831] hover:bg-[#FFD369]/90"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Logging in</span>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#222831] border-t-transparent"></span>
                </div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-[#EEEEEE]/70">
            Don't have an account?{" "}
            <Link to={`/signup`} className="text-[#FFD369] hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
