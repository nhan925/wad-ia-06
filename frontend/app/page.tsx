import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            User Registration System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern, secure authentication system built with cutting-edge technologies
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Create an account or log in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="sm:flex-1">
                <Button className="w-full" size="lg">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login" className="sm:flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  Log In
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="pt-6 border-t">
              <h3 className="text-sm font-semibold text-center mb-4 text-muted-foreground">
                FEATURES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium">Secure Password Hashing</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">
                    bcrypt encryption with 10 salt rounds
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">Strong Validation</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">
                    Client & server-side password requirements
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm font-medium">Modern Tech Stack</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">
                    NestJS backend with Next.js 16 frontend
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm font-medium">Real-time Feedback</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">
                    Toast notifications & form validation
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t">
              <h3 className="text-sm font-semibold text-center mb-3 text-muted-foreground">
                BUILT WITH
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['NestJS', 'Next.js 16', 'React 19', 'PostgreSQL', 'TypeORM', 'Tailwind CSS', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-secondary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>HCMUS - Web Application Development Course</p>
          <p className="text-xs mt-1">Year 4, Semester 1 - Assignment IA06</p>
        </div>
      </div>
    </div>
  );
}
