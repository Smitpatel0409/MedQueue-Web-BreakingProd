"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PriorityBadge } from "@/components/PriorityBadge";
import {
  suggestDepartmentAndTriage,
  departments,
  type Priority,
  type VisitType,
} from "@/lib/mockData";
import { Printer, Copy, QrCode, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ReceptionistPortal() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    visitType: "",
    symptoms: "",
    phone: "",
    department: "",
  });

  const [triage, setTriage] = useState<{
    priority: Priority;
    suggestedDept: string;
  }>({
    priority: "Low",
    suggestedDept: "General OPD",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<any>(null);

  const handleSymptomsChange = (value: string) => {
    setFormData({ ...formData, symptoms: value });
    if (value.length > 10) {
      const result = suggestDepartmentAndTriage(value);
      setTriage({
        priority: result.priority,
        suggestedDept: result.department,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age) {
      toast({
        title: "Validation Error",
        description: "Name and Age are required fields.",
        variant: "destructive",
      });
      return;
    }

    const deptCode = (formData.department || triage.suggestedDept)
      .substring(0, 4)
      .toUpperCase();
    const priorityCode = triage.priority[0];
    const tokenNum = String(Math.floor(Math.random() * 900) + 100);
    const token = `${deptCode}-${priorityCode}-${tokenNum}`;

    const tokenData = {
      token,
      ...formData,
      priority: triage.priority,
      department: formData.department || triage.suggestedDept,
      location: { floor: 3, room: "305" },
      patientLink: `https://hosp.com/t/${token}`,
    };

    setGeneratedToken(tokenData);
    setShowSuccess(true);

    toast({
      title: "Token Generated",
      description: `Token ${token} created successfully.`,
    });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      visitType: "",
      symptoms: "",
      phone: "",
      department: "",
    });
    setTriage({ priority: "Low", suggestedDept: "General OPD" });
  };

  return (
    <div className="min-h-screen bg-clinical-bg">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">
            New Token Registration
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter patient details and triage
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>
                  Complete the form to generate a token
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Patient Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="0"
                        max="120"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        placeholder="Age"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, gender: value })
                        }
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitType">Visit Type</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, visitType: value })
                        }
                      >
                        <SelectTrigger id="visitType">
                          <SelectValue placeholder="Select visit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Follow-up">Follow-up</SelectItem>
                          <SelectItem value="Reports-only">
                            Reports-only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department (optional)</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, department: value })
                        }
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Auto-suggested from triage" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Symptoms / Chief Complaint</Label>
                    <Textarea
                      id="symptoms"
                      value={formData.symptoms}
                      onChange={(e) => handleSymptomsChange(e.target.value)}
                      placeholder="Describe symptoms or reason for visit..."
                      rows={4}
                      maxLength={280}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.symptoms.length}/280 characters
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Generate Token
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Triage Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Priority Level
                  </p>
                  <PriorityBadge priority={triage.priority} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Suggested Department
                  </p>
                  <p className="font-medium text-foreground">
                    {triage.suggestedDept}
                  </p>
                </div>
                {formData.symptoms && (
                  <p className="text-xs text-muted-foreground">
                    Triage updates automatically as you type symptoms
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Token Generated Successfully</DialogTitle>
            <DialogDescription>
              Patient token has been created and is ready to use
            </DialogDescription>
          </DialogHeader>
          {generatedToken && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-6 text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {generatedToken.token}
                </div>
                <PriorityBadge priority={generatedToken.priority} />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">
                    {generatedToken.department}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">
                    Floor {generatedToken.location.floor} · Room{" "}
                    {generatedToken.location.room}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast({ title: "Print initiated" })}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedToken.token);
                    toast({ title: "Token copied to clipboard" });
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast({ title: "QR code displayed" })}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
