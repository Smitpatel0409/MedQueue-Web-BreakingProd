"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Search, MapPin, Clock, LogOut, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PatientKiosk() {
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [timeoutSeconds, setTimeoutSeconds] = useState(30);

  useEffect(() => {
    if (patient) {
      const timer = setInterval(() => {
        setTimeoutSeconds((prev) => {
          if (prev <= 1) {
            handleClear();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [patient]);

  const handleSearch = () => {
    if (!token) {
      toast({
        title: "Token required",
        description: "Please enter your token number",
        variant: "destructive",
      });
      return;
    }

    const foundPatient = mockPatients.find(
      (p) => p.token.toUpperCase() === token.toUpperCase()
    );

    if (!foundPatient) {
      toast({
        title: "Token not found",
        description: "Please check your token number and try again",
        variant: "destructive",
      });
      return;
    }

    // Optional name verification
    if (
      firstName &&
      !foundPatient.name.toLowerCase().startsWith(firstName.toLowerCase())
    ) {
      toast({
        title: "Name mismatch",
        description: "The name doesn't match our records",
        variant: "destructive",
      });
      return;
    }

    setPatient(foundPatient);
    setTimeoutSeconds(30);
  };

  const handleClear = () => {
    setToken("");
    setFirstName("");
    setPatient(null);
    setTimeoutSeconds(30);
  };

  if (!patient) {
    return (
      <div className="min-h-screen bg-clinical-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl">
                Check Your Token Status
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your token number to view your current status and location
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token" className="text-lg">
                  Token Number *
                </Label>
                <Input
                  id="token"
                  placeholder="e.g., CARD-H-014"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())}
                  className="text-2xl font-mono text-center h-16"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-lg">
                  First Name (optional)
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-xl h-14"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full text-lg h-14"
            >
              <Search className="mr-2 h-5 w-5" />
              View Status
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Touch-friendly kiosk interface for patient convenience
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const firstNameInitial = patient.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-clinical-bg p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Hello, {firstNameInitial}!</h1>
            <p className="text-muted-foreground">Here's your current status</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Privacy Mode</p>
            <p className="text-lg font-medium">Clearing in {timeoutSeconds}s</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="text-2xl px-6 py-2 font-mono"
                  >
                    {patient.token}
                  </Badge>
                  <PriorityBadge priority={patient.priority} />
                </div>
                <StatusBadge status={patient.status} />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-2xl font-bold">{patient.department}</p>
                <p className="text-muted-foreground">Dr. Smith</p>
              </div>
              <div className="flex items-center gap-2 text-xl">
                <span className="font-medium">
                  Floor {patient.location.floor} · Room {patient.location.room}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Queue Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-4">
              <p className="text-5xl font-bold text-primary mb-2">
                {patient.position || 0}
              </p>
              <p className="text-lg text-muted-foreground">ahead of you</p>
              {patient.etaMinutes && patient.etaMinutes > 0 && (
                <p className="text-2xl font-semibold mt-3">
                  ETA ~{patient.etaMinutes} min
                </p>
              )}
            </CardContent>
          </Card>

          {patient.status === "COMPLETED" && (
            <Card className="md:col-span-2 border-status-proceed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-status-proceed">
                  <CheckCircle2 className="h-6 w-6" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-lg">Lab</p>
                      <p className="text-muted-foreground">
                        Floor 2 · Blood tests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-lg">Pharmacy</p>
                      <p className="text-muted-foreground">
                        Ground Floor · Collect medicines
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="md:col-span-2 bg-muted/50">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  This screen will clear automatically for your privacy
                </p>
                <Button onClick={handleClear} size="lg" variant="outline">
                  <LogOut className="mr-2 h-5 w-5" />
                  Clear Screen Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
