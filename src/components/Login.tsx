import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Shield } from "lucide-react";
import type { AppUser } from "../App";

interface LoginProps {
  onLoginSuccess: (user: AppUser) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    role: "tourist" as "tourist" | "admin",
    idProofType: "Aadhaar",
    idProofNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      const newUser: AppUser = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        location: form.location,
        idProof: {
          type: form.idProofType,
          number: form.idProofNumber,
        },
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      onLoginSuccess(newUser);
    } else {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved) as AppUser;
        if (parsed.email === form.email) {
          onLoginSuccess(parsed);
        } else {
          alert("User not found. Please sign up first.");
        }
      } else {
        alert("No users registered. Please sign up first.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="location"
                  placeholder="Your Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-gray-700"
                >
                  <option value="tourist">Tourist</option>
                  <option value="admin">Admin</option>
                </select>

                {/* ID Proof Type */}
                <label className="block text-sm text-gray-600">
                  Select ID Proof Type
                </label>
                <select
                  name="idProofType"
                  value={form.idProofType}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-gray-700"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="Passport">Passport</option>
                  <option value="License">Driving License</option>
                </select>

                {/* ID Proof Number */}
                <Input
                  type="text"
                  name="idProofNumber"
                  placeholder="Enter ID Number"
                  value={form.idProofNumber}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don’t have an account? Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
