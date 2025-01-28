import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email({ message: "Informe um e-mail válido" }).nonempty({
    message: "E-mail é obrigatório",
  }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .nonempty({ message: "Senha é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
  });

  return { handleSubmit, register, errors };
}
