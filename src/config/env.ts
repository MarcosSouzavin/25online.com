import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("3000"),
    JWT_SECRET: z.string().min(16, "JWT_SECRET deve ter pelo menos 16 caracteres")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Erro na validação das variáveis de ambiente:", parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;