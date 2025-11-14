"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockPatients, type Patient } from "@/lib/mockData";
import { Check, SkipForward, UserCircle, Activity, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function DoctorQueue() {
  const [patients, setPatients] = useState<Patient[]>(
    mockPatients.filter((p) => p.department === "Cardiology")
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const currentPatient = patients.find((p) => p.status === "NOW BEING SEEN");
  const queuePatients = patients.filter((p) => p.status === "WAITING");
  const nextUp = queuePatients[0];

  const handleCallNext = () => {
    if (!nextUp) {
      toast({ title: "No patients in queue", variant: "destructive" });
      return;
    }

    setPatients((prev) =>
      prev.map((p) => {
        if (p.token === nextUp.token)
          return { ...p, status: "NOW BEING SEEN" as const };
        if (p.status === "NOW BEING SEEN")
          return { ...p, status: "WAITING" as const };
        return p;
      })
    );

    toast({
      title: "Patient called",
      description: `${nextUp.name} - ${nextUp.token}`,
    });
  };

  const handleComplete = () => {
    if (!currentPatient) return;

    setPatients((prev) =>
      prev.map((p) =>
        p.token === currentPatient.token
          ? { ...p, status: "COMPLETED" as const }
          : p
      )
    );

    toast({
      title: "Consultation completed",
      description: currentPatient.token,
    });
  };

  const handleSkip = () => {
    if (!currentPatient) return;

    setPatients((prev) =>
      prev.map((p) =>
        p.token === currentPatient.token
          ? { ...p, status: "SKIPPED" as const }
          : p
      )
    );

    toast({ title: "Patient skipped", description: currentPatient.token });
  };

  const stats = {
    high: queuePatients.filter((p) => p.priority === "High").length,
    medium: queuePatients.filter((p) => p.priority === "Medium").length,
    low: queuePatients.filter((p) => p.priority === "Low").length,
  };

  return (
    <div className="min-h-screen bg-clinical-bg">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Cardiology · OPD Room 305
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-status-proceed animate-pulse" />
                <span>Live · Last sync 10:42</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Current Patient
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPatient ? (
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{currentPatient.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{currentPatient.token}</Badge>
                    <PriorityBadge priority={currentPatient.priority} />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No patient being seen</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Next Up</CardTitle>
            </CardHeader>
            <CardContent>
              {nextUp ? (
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{nextUp.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{nextUp.token}</Badge>
                    <PriorityBadge priority={nextUp.priority} />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Queue is empty</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Queue Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-priority-high font-bold text-lg">
                    {stats.high}
                  </span>
                  <p className="text-xs text-muted-foreground">High</p>
                </div>
                <div>
                  <span className="text-priority-medium font-bold text-lg">
                    {stats.medium}
                  </span>
                  <p className="text-xs text-muted-foreground">Medium</p>
                </div>
                <div>
                  <span className="text-priority-low font-bold text-lg">
                    {stats.low}
                  </span>
                  <p className="text-xs text-muted-foreground">Low</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Queue</CardTitle>
                <CardDescription>
                  Patients waiting for consultation
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCallNext} disabled={!nextUp}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Call Next
                </Button>
                <Button
                  variant="outline"
                  onClick={handleComplete}
                  disabled={!currentPatient}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark Done
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  disabled={!currentPatient}
                >
                  <SkipForward className="mr-2 h-4 w-4" />
                  Skip
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-center">Vitals</TableHead>
                  <TableHead>Waiting</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPatient && (
                  <TableRow
                    className="cursor-pointer bg-primary/5 border-l-4 border-l-primary"
                    onClick={() => setSelectedPatient(currentPatient)}
                  >
                    <TableCell className="font-mono font-medium">
                      {currentPatient.token}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{currentPatient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {currentPatient.age}y · {currentPatient.gender}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={currentPatient.priority} />
                    </TableCell>
                    <TableCell className="text-center">
                      {currentPatient.vitalsDone ? (
                        <Activity className="h-4 w-4 text-status-proceed mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{currentPatient.waiting}</TableCell>
                    <TableCell>
                      <StatusBadge status={currentPatient.status} />
                    </TableCell>
                  </TableRow>
                )}
                {queuePatients.map((patient) => (
                  <TableRow
                    key={patient.token}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <TableCell className="font-mono font-medium">
                      {patient.token}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.age}y · {patient.gender}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={patient.priority} />
                    </TableCell>
                    <TableCell className="text-center">
                      {patient.vitalsDone ? (
                        <Activity className="h-4 w-4 text-status-proceed mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {patient.waiting}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={patient.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Sheet
        open={!!selectedPatient}
        onOpenChange={() => setSelectedPatient(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Patient Details</SheetTitle>
            <SheetDescription>
              View patient information and complaint
            </SheetDescription>
          </SheetHeader>
          {selectedPatient && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Token</p>
                <p className="font-mono font-bold text-lg">
                  {selectedPatient.token}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{selectedPatient.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{selectedPatient.age} years</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{selectedPatient.gender}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Priority</p>
                <PriorityBadge priority={selectedPatient.priority} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Chief Complaint</p>
                <p className="text-sm bg-muted p-3 rounded-md">
                  {selectedPatient.symptoms}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Vitals Status</p>
                <Badge
                  variant={selectedPatient.vitalsDone ? "default" : "outline"}
                >
                  {selectedPatient.vitalsDone ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
