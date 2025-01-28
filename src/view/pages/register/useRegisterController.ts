import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { authService } from "../../../app/services/authService/authService";
import { SignupParams } from "../../../app/services/authService/signup";

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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signUp(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      toast.error("Erro ao criar conta");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
