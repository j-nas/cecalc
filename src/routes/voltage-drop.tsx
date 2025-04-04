import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/voltage-drop")({
  component: RouteComponent,
});

const formSchema = z.object({
  conductorSize: z.number().min(1, "Conductor size is required"),
  length: z.number().min(1, "Length is required"),
  voltage: z.number().min(1, "Voltage is required"),
  current: z.number().min(1, "Current is required"),
  powerFactor: z.number().min(0, "Power factor is required"),
  temperature: z.number().min(0, "Temperature is required"),
  insulationType: z.enum(["PVC", "XLPE", "EPR"]),
  conduitType: z.enum(["EMT", "PVC", "RMC"]),
  ambientTemperature: z.number().min(0, "Ambient temperature is required"),
  installationMethod: z.enum([
    "Free air",
    "Conduit",
    "Cable tray",
    "Direct burial",
  ]),
  voltageDrop: z.number().min(0, "Voltage drop is required"),
  voltageDropPercentage: z
    .number()
    .min(0, "Voltage drop percentage is required"),
  voltageDropLimit: z.number().min(0, "Voltage drop limit is required"),
  voltageDropLimitPercentage: z
    .number()
    .min(0, "Voltage drop limit percentage is required"),
  voltageDropCalculation: z.enum([
    "Voltage drop",
    "Voltage drop percentage",
    "Voltage drop limit",
    "Voltage drop limit percentage",
  ]),
});

function RouteComponent() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold">Voltage Drop Calculator</h1>
          </CardTitle>
          <CardDescription>
            <p className="text-gray-600">
              Calculate the voltage drop in your electrical circuits
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
