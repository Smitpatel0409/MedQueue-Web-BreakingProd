import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Users,
  Activity,
  Smartphone,
  Monitor,
  Heart,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const portals = [
    {
      title: "Receptionist Portal",
      description: "Register new patients and generate tokens",
      icon: UserPlus,
      path: "/receptionist",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Doctor's Queue",
      description: "Manage department queue and consultations",
      icon: Users,
      path: "/doctor-queue",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Nurse Vitals Station",
      description: "Pre-check and record patient vitals",
      icon: Activity,
      path: "/nurse-vitals",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Patient Mobile View",
      description: "Patient's token status and navigation",
      icon: Smartphone,
      path: "/patient?token=CARD-H-014",
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: "Patient Kiosk",
      description: "Self-service kiosk for token lookup",
      icon: Monitor,
      path: "/kiosk",
      color: "text-teal-600",
      bg: "bg-teal-50 dark:bg-teal-950",
    },
  ];

  return (
    <div className="min-h-screen bg-clinical-bg">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary text-primary-foreground">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Med Queue Management
              </h1>
              <p className="text-muted-foreground">
                Intelligent queue management with triage
              </p>
            </div>
          </div>
          {/* <ThemeToggle /> */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Select Portal</h2>
            <p className="text-muted-foreground">
              Choose your role to access the appropriate interface
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link key={portal.path} href={portal.path}>
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                    <CardHeader>
                      <div
                        className={`w-14 h-14 rounded-lg ${portal.bg} flex items-center justify-center mb-3`}
                      >
                        <Icon className={`h-7 w-7 ${portal.color}`} />
                      </div>
                      <CardTitle>{portal.title}</CardTitle>
                      <CardDescription>{portal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Open Portal
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-muted">
            <h3 className="font-semibold mb-2">System Features</h3>
            <ul className="grid gap-2 md:grid-cols-2 text-sm text-muted-foreground">
              <li>• Priority-based queue management</li>
              <li>• Real-time status updates</li>
              <li>• Automated triage system</li>
              <li>• Vitals pre-check workflow</li>
              <li>• Mobile-friendly patient interface</li>
              <li>• Self-service kiosk support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
