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
import { Link } from "react-router-dom";

export default function SignupPage() {
  const { signupErrors, signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    // phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Signup Data:", formData);

    // ensure formData matches the structure for /signup body
    signup(formData);
  };

  return (
    <div className="flex items-center justify-center bg-[#222831] p-4 text-[#EEEEEE]">
      <Card className="w-full max-w-md border-[#393E46] bg-[#222831] text-[#EEEEEE] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#FFD369]">Sign Up</CardTitle>
          <CardDescription className="text-[#EEEEEE]/70">
            Create a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#EEEEEE]">
                Name
              </Label>

              <Input
                id="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="border-[#393E46] bg-[#222831] text-[#EEEEEE] focus:border-[#FFD369] focus:ring-[#FFD369]/50"
              />

              {signupErrors.name &&
                signupErrors.name.map((err, i) => (
                  <p key={i} className="text-red-400">
                    {err}
                  </p>
                ))}
            </div>

            {/* username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#EEEEEE]">
                Username
              </Label>

              <Input
                id="username"
                placeholder="johndoe"
                required
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                className="border-[#393E46] bg-[#222831] text-[#EEEEEE] focus:border-[#FFD369] focus:ring-[#FFD369]/50"
              />

              {signupErrors.username &&
                signupErrors.username.map((err, i) => (
                  <p key={i} className="text-red-400">
                    {err}
                  </p>
                ))}
            </div>

            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#EEEEEE]">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="border-[#393E46] bg-[#222831] text-[#EEEEEE] focus:border-[#FFD369] focus:ring-[#FFD369]/50"
              />

              {signupErrors.email &&
                signupErrors.email.map((err, i) => (
                  <p key={i} className="text-red-400">
                    {err}
                  </p>
                ))}
            </div>

            {/* password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#EEEEEE]">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="border-[#393E46] bg-[#222831] text-[#EEEEEE] focus:border-[#FFD369] focus:ring-[#FFD369]/50"
              />

              {signupErrors.password &&
                signupErrors.password.map((err, i) => (
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
                  <span className="mr-2">Creating account</span>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#222831] border-t-transparent"></span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-[#EEEEEE]/70">
            Already have an account?{" "}
            <Link to={`/login`} className="text-[#FFD369] hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
