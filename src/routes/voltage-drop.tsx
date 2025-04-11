import { Button } from "@/components/ui/button";
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="sm:w-1/2 w-11/12">
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
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="conductorSize" className="block mb-2">
                  Conductor Size
                </label>
                <input
                  type="number"
                  id="conductorSize"
                  name="conductorSize"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="length" className="block mb-2">
                  Length (ft)
                </label>
                <input
                  type="number"
                  id="length"
                  name="length"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="voltage" className="block mb-2">
                  Voltage (V)
                </label>
                <input
                  type="number"
                  id="voltage"
                  name="voltage"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Add more fields as needed */}
              <Button type="submit">Calculate</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
