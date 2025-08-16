import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Upload,
  Shield,
  Navigation,
  Share2,
  ArrowRight,
  Github,
  ExternalLink,
  Mail,
  FileText,
  Lock,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    {
      icon: <Upload className="h-8 w-8 text-[#FFD369]" />,
      title: "Batch Uploading",
      description:
        "Upload up to 10 files at once with 5MB per file limit using Multer-powered backend.",
    },
    {
      icon: <Shield className="h-8 w-8 text-[#FFD369]" />,
      title: "Secure JWT Authentication",
      description:
        "Built-in token rotation drastically reduces security risks by 80% compared to traditional login systems.",
    },
    {
      icon: <Navigation className="h-8 w-8 text-[#FFD369]" />,
      title: "Breadcrumb Navigation",
      description:
        "Seamlessly explore folder hierarchies with clear breadcrumb trails and path history.",
    },
    {
      icon: <Share2 className="h-8 w-8 text-[#FFD369]" />,
      title: "Instant Share Links",
      description:
        "Easily share files via secure, auto-generated Supabase links for download and access.",
    },
  ];

  const steps = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Upload",
      description: "Drag and drop or select files to upload",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Store Securely",
      description: "Files are encrypted and stored safely",
    },
    {
      icon: <Navigation className="h-6 w-6" />,
      title: "Navigate",
      description: "Browse through organized folder structure",
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Share",
      description: "Generate secure links for easy sharing",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#222831] text-[#EEEEEE]">
      {/* Background texture overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.02]">
        <div className="[background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%221%22 fill=%22white%22 fill-opacity=%220.4%22 /%3E%3C/svg%3E')] absolute inset-0"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 py-20">
        {/* Radial gradient background */}
        <div className="bg-gradient-radial absolute inset-0 from-[#393E46]/20 via-[#222831] to-[#222831]"></div>
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#FFD369]/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[#FFD369]/3 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <h1 className="mb-6 text-5xl leading-tight font-bold md:text-7xl">
              <span className="text-[#EEEEEE]">Secure & Smart </span>
              <span className="text-[#FFD369]">Cloud Storage</span>
              <br />
              <span className="text-[#EEEEEE]">On-the-Go</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-[#EEEEEE]/80 md:text-2xl">
              Upload, manage, and share your files with confidence—anywhere,
              anytime.
            </p>
          </div>

          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup">
              <Button className="group rounded-xl bg-[#FFD369] px-26 py-6 text-lg font-semibold text-[#222831] shadow-lg transition-all duration-300 hover:bg-[#FFD369]/90 hover:shadow-xl">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="rounded-xl border-[#393E46] bg-transparent px-8 py-6 text-lg text-[#EEEEEE] transition-all duration-300 hover:bg-[#393E46] hover:text-[#FFD369]"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* <div className="relative mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#393E46]/30 bg-gradient-to-br from-[#393E46]/50 to-[#222831]/50 p-8 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-[#393E46]/30 p-3">
                  <FileText className="h-5 w-5 text-[#FFD369]" />
                  <div className="h-4 flex-1 rounded bg-[#EEEEEE]/20"></div>
                  <div className="h-4 w-16 rounded bg-[#EEEEEE]/10"></div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#393E46]/30 p-3">
                  <FileText className="h-5 w-5 text-[#FFD369]" />
                  <div className="h-4 flex-1 rounded bg-[#EEEEEE]/20"></div>
                  <div className="h-4 w-16 rounded bg-[#EEEEEE]/10"></div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#393E46]/30 p-3">
                  <FileText className="h-5 w-5 text-[#FFD369]" />
                  <div className="h-4 flex-1 rounded bg-[#EEEEEE]/20"></div>
                  <div className="h-4 w-16 rounded bg-[#EEEEEE]/10"></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Core Feature Highlight */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-4xl font-bold text-[#FFD369] md:text-5xl">
            Access Files Without Compromising Your Identity
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#EEEEEE]/80 md:text-xl">
            No more worries about leaving your main account logged in just to
            grab a few documents. With Cloudvault, you can create a secure
            account using only a username and password—no email required. Access
            your files across any device without ever exposing sensitive
            personal information.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-transparent to-[#393E46]/10 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#EEEEEE] md:text-5xl">
              Powerful Features
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#EEEEEE]/70">
              Everything you need for secure, efficient cloud storage
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-[#393E46] bg-[#393E46]/30 transition-all duration-300 hover:scale-105 hover:bg-[#393E46]/50"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-xl bg-[#FFD369]/10 p-3 transition-colors group-hover:bg-[#FFD369]/20">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#EEEEEE]">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-[#EEEEEE]/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-[#FFD369] md:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#EEEEEE]/70">
              Get started with CloudVault in just four simple steps
            </p>
          </div>

          <div className="relative">
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="group relative text-center">
                  <div className="relative mb-6">
                    <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD369] transition-transform group-hover:scale-110">
                      <div className="text-[#222831]">{step.icon}</div>
                    </div>
                    <div className="absolute top-2 -right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#393E46] text-sm font-bold text-[#FFD369]">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-[#EEEEEE]">
                    {step.title}
                  </h3>
                  <p className="text-[#EEEEEE]/70">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Connecting lines - positioned absolutely to connect step circles */}
            <div className="absolute top-8 right-0 left-0 z-0 hidden h-0.5 bg-[#393E46] md:block">
              <div className="flex h-full justify-between">
                <div className="flex w-1/4 justify-center">
                  <div className="h-0.5 w-16 bg-[#222831]"></div>
                </div>
                <div className="flex w-1/4 justify-center">
                  <div className="h-0.5 w-16 bg-[#222831]"></div>
                </div>
                <div className="flex w-1/4 justify-center">
                  <div className="h-0.5 w-16 bg-[#222831]"></div>
                </div>
                <div className="flex w-1/4 justify-center">
                  <div className="h-0.5 w-16 bg-[#222831]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#393E46]/20 to-[#FFD369]/10 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-[#EEEEEE] md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[#EEEEEE]/80">
            Join thousands of users who trust CloudVault for their file storage
            needs.
          </p>
          <Link to="/signup">
            <Button className="group rounded-xl bg-[#FFD369] px-8 py-6 text-lg font-semibold text-[#222831] shadow-lg transition-all duration-300 hover:bg-[#FFD369]/90 hover:shadow-xl">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#393E46] bg-[#222831]/90 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFD369]">
                <Zap className="h-5 w-5 text-[#222831]" />
              </div>
              <span className="text-xl font-bold text-[#FFD369]">
                CloudVault
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/addy118/cloudvault"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#EEEEEE]/70 transition-colors hover:text-[#FFD369]"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:adityakirti.dev@gmail.com"
                className="flex items-center gap-2 text-[#EEEEEE]/70 transition-colors hover:text-[#FFD369]"
              >
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
