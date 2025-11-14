"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockPatients, type Patient } from "@/lib/mockData";
import { MapPin, Clock, Navigation, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function PatientView() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token") || "CARD-H-014";
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // Simulate fetching patient data
    const foundPatient = mockPatients.find((p) => p.token === tokenParam);
    setPatient(foundPatient || null);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const updated = mockPatients.find((p) => p.token === tokenParam);
      if (updated) setPatient(updated);
    }, 5000);

    return () => clearInterval(interval);
  }, [tokenParam]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-clinical-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium text-destructive">
              Invalid token
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please check your token number and try again
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clinical-bg">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <Badge
                  variant="outline"
                  className="text-lg px-4 py-2 font-mono"
                >
                  {patient.token}
                </Badge>
              </div>
              <PriorityBadge priority={patient.priority} />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Where to Go
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {patient.department}
              </p>
              <p className="text-muted-foreground">Dr. Smith</p>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Navigation className="h-5 w-5 text-primary" />
              <span className="font-medium">
                Floor {patient.location.floor} · Room {patient.location.room}
              </span>
            </div>
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Open in Maps
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Your Place in Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <p className="text-5xl font-bold text-primary mb-2">
                {patient.position || 0}
              </p>
              <p className="text-lg text-muted-foreground">ahead of you</p>
              {patient.etaMinutes && patient.etaMinutes > 0 && (
                <p className="text-2xl font-semibold mt-4">
                  ETA ~{patient.etaMinutes} min
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <StatusBadge status={patient.status} />
            </div>
          </CardContent>
        </Card>

        {patient.status === "COMPLETED" && (
          <Card className="border-status-proceed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-status-proceed">
                <CheckCircle2 className="h-5 w-5" />
                Next Steps
              </CardTitle>
              <CardDescription>
                Please proceed to the following departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Lab · Floor 2</p>
                    <p className="text-sm text-muted-foreground">Blood tests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Pharmacy · Ground Floor</p>
                    <p className="text-sm text-muted-foreground">
                      Collect medicines
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/50">
          <CardContent className="py-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>Need help? Reception Desk / Call x123</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
