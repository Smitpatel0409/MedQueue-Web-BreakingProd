"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { mockPatients, type Patient, type Vitals } from "@/lib/mockData";
import { Activity, Check, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function NurseVitals() {
  const [patients, setPatients] = useState<Patient[]>(
    mockPatients.filter((p) => p.department === "General OPD" && !p.vitalsDone)
  );
  const [selectedToken, setSelectedToken] = useState<string | null>(
    patients[0]?.token || null
  );
  const [showEscalate, setShowEscalate] = useState(false);
  const [vitals, setVitals] = useState<Vitals>({
    bp: "",
    pulse: 0,
    temp: 0,
    spo2: 0,
    rr: 0,
    notes: "",
  });

  const selectedPatient = patients.find((p) => p.token === selectedToken);

  const handleMarkComplete = () => {
    if (!selectedPatient) return;

    setPatients((prev) =>
      prev.map((p) =>
        p.token === selectedToken ? { ...p, vitalsDone: true } : p
      )
    );

    toast({
      title: "Vitals completed",
      description: `Vitals recorded for ${selectedPatient.name}`,
    });

    // Move to next patient
    const remainingPatients = patients.filter(
      (p) => p.token !== selectedToken && !p.vitalsDone
    );
    if (remainingPatients.length > 0) {
      setSelectedToken(remainingPatients[0].token);
    } else {
      setSelectedToken(null);
    }

    // Reset form
    setVitals({ bp: "", pulse: 0, temp: 0, spo2: 0, rr: 0, notes: "" });
  };

  const handleEscalate = () => {
    if (!selectedPatient) return;

    setPatients((prev) =>
      prev.map((p) =>
        p.token === selectedToken
          ? { ...p, priority: "High" as const, vitalsDone: true }
          : p
      )
    );

    toast({
      title: "Priority escalated",
      description: `${selectedPatient.name} upgraded to High priority`,
      variant: "default",
    });

    setShowEscalate(false);
    handleMarkComplete();
  };

  return (
    <div className="min-h-screen bg-clinical-bg">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">
            Vitals Station · General OPD (Triage)
          </h1>
          <p className="text-sm text-muted-foreground">
            Pre-check patients before consultation
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Queue strip */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">
              Upcoming Patients ({patients.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {patients.map((patient) => (
                <button
                  key={patient.token}
                  onClick={() => setSelectedToken(patient.token)}
                  className={`flex-shrink-0 rounded-lg border-2 p-3 text-left transition-all hover:bg-muted/50 ${
                    selectedToken === patient.token
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {patient.token}
                    </Badge>
                    <PriorityBadge priority={patient.priority} />
                  </div>
                  <p className="font-medium text-sm">{patient.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {patient.symptoms}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedPatient ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Record Vitals</CardTitle>
                  <CardDescription>
                    {selectedPatient.name} · {selectedPatient.age}y ·{" "}
                    {selectedPatient.gender}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="bp">
                          Blood Pressure (Systolic/Diastolic)
                        </Label>
                        <Input
                          id="bp"
                          placeholder="120/80"
                          value={vitals.bp}
                          onChange={(e) =>
                            setVitals({ ...vitals, bp: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pulse">Pulse (bpm)</Label>
                        <Input
                          id="pulse"
                          type="number"
                          placeholder="72"
                          value={vitals.pulse || ""}
                          onChange={(e) =>
                            setVitals({
                              ...vitals,
                              pulse: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="temp">Temperature (°F)</Label>
                        <Input
                          id="temp"
                          type="number"
                          step="0.1"
                          placeholder="98.6"
                          value={vitals.temp || ""}
                          onChange={(e) =>
                            setVitals({
                              ...vitals,
                              temp: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="spo2">SpO₂ (%)</Label>
                        <Input
                          id="spo2"
                          type="number"
                          placeholder="98"
                          value={vitals.spo2 || ""}
                          onChange={(e) =>
                            setVitals({
                              ...vitals,
                              spo2: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rr">
                          Respiratory Rate (breaths/min)
                        </Label>
                        <Input
                          id="rr"
                          type="number"
                          placeholder="16"
                          value={vitals.rr || ""}
                          onChange={(e) =>
                            setVitals({ ...vitals, rr: Number(e.target.value) })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional observations..."
                        value={vitals.notes}
                        onChange={(e) =>
                          setVitals({ ...vitals, notes: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={handleMarkComplete}>
                        <Check className="mr-2 h-4 w-4" />
                        Mark Vitals Completed
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowEscalate(true)}
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Flag Concern
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Patient Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Token</p>
                    <p className="font-mono font-bold">
                      {selectedPatient.token}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <PriorityBadge priority={selectedPatient.priority} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chief Complaint
                    </p>
                    <p className="text-sm mt-1">{selectedPatient.symptoms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visit Type</p>
                    <Badge variant="outline">{selectedPatient.visitType}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">
                No patients pending vitals check
              </p>
              <p className="text-sm text-muted-foreground">
                All patients have been processed
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={showEscalate} onOpenChange={setShowEscalate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Escalate Priority to High?</AlertDialogTitle>
            <AlertDialogDescription>
              This will upgrade {selectedPatient?.name}'s priority to High and
              notify the doctor. Confirm if vitals indicate a concerning
              condition.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEscalate}>
              Confirm Escalation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
