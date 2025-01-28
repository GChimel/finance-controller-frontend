import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { httpClient } from "../../../app/services/httpClient";

const schema = z.object({
  email: z.string().email({ message: "Informe um e-mail válido" }).nonempty({
    message: "E-mail é obrigatório",
  }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .nonempty({ message: "Senha é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function UserLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await httpClient.post("/auth/login", data);
  });

  console.log(errors);

  return { handleSubmit, register, errors };
}
