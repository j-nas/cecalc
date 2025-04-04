// app/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const filePath = "count.txt";

async function readCount() {
  return Number.parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  );
}

const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  return readCount();
});

const updateCount = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>CeCalc</CardTitle>
          <CardDescription>
            Electrical calculations based on CEC 2021
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Link to={"/voltage-drop"}>Voltage Drop</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
