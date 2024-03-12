import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { loginRoute } from "@/lib/apiRoutes";

// Define a schema for the form data validation
const schema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
});

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const onInputchange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const subbmit = async (e: any) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      return toast(result.error.errors[0].message);
    }

    try {
      setIsLoading(true);
      const response: any = await axios.post(loginRoute, data);
      toast(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigateTo("/");
      data.email = "";
      data.password = "";
    } catch (error: any) {
      toast(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 h-screen w-screen flex items-center justify-center">
      <div className="max-w-[400px] w-full h-fit p-4 m-2 flex flex-col gap-4 bg-zinc-800 rounded-lg">
        <p className="text-xl text-white text-center">PDF Generator</p>

        <form onSubmit={subbmit} className="flex flex-col gap-3">
          <Input
            className="bg-zinc-300"
            name="email"
            value={data.email}
            onChange={onInputchange}
            placeholder="Email"
            type="email"
          />
          <Input
            className="bg-zinc-300"
            name="password"
            value={data.password}
            onChange={onInputchange}
            placeholder="Password"
            type="password"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="hover:bg-green-600 text-white bg-green-700 disabled:bg-green-400"
            variant={"default"}
          >
            {isLoading ? (
              <Loader className="animate-spin text-zinc-100 font-bold" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-white text-center">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-500">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};
