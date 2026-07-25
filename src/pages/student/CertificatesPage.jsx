import React from "react";
import { mockCertificates } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Card, Button, Badge, Breadcrumb } from "../../components/common/UIComponents";
import confetti from "canvas-confetti";
import { Award, Download, GraduationCap, CheckCircle2, ShieldCheck } from "lucide-react";

export const CertificatesPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleDownload = (cert) => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    showToast(`Downloading Certificate: ${cert.courseTitle}`, "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/student/dashboard" }, { label: "My Certificates" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Verified Certificates</h1>
          <p className="text-xs text-slate-500">Official university course completion credentials & digital badges</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.map((cert) => (
          <Card key={cert.id} hoverable className="p-6 relative overflow-hidden border-blue-500/30">
            {/* Background Decorative Crest */}
            <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none">
              <GraduationCap className="w-64 h-64 text-blue-600" />
            </div>

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{cert.courseTitle}</h3>
                    <span className="text-[11px] text-slate-500">Issued by Academia Portal</span>
                  </div>
                </div>
                <Badge variant="success">Verified</Badge>
              </div>

              {/* Student Details Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Recipient Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{user?.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Issue Date:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{cert.issueDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Instructor:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{cert.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Credential Hash:</span>
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">{cert.credentialId}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Acquired Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownload(cert)}
                className="w-full font-bold shadow-md shadow-blue-500/20"
              >
                <Download className="w-4 h-4" /> Download Official PDF Certificate
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
