import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const PRACTITIONER_ID = "practitioner-1";

const ROLES = ["Practitioner", "Senior Practitioner", "Researcher", "Admin"];

const MODALITIES = [
  "Russian PMA Pulse Analysis",
  "Bio-Reasonanz Laser Scanning",
  "Space Medicine Thermal IR",
  "Five Elements TCM",
  "Vedic Nadi Pariksha",
  "I Ching / Ba Gua Mapping",
  "Acupuncture Protocol",
  "Nutritional Counseling",
];

export default function Profile() {
  const { actor, isFetching } = useActor();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Practitioner");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getPractitioner(PRACTITIONER_ID)
      .then((p) => {
        setName(p.name || "");
        setRole(p.role || "Practitioner");
      })
      .catch(() => {
        // no profile yet — fine
      });
  }, [actor, isFetching]);

  async function handleSave() {
    if (!actor) return;
    setSaving(true);
    try {
      await actor.savePractitioner(PRACTITIONER_ID, name.trim(), role);
      toast.success("Profile saved successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Practitioner Profile</h1>
        <p className="text-sm text-gray-400 mt-1">
          Your clinical identity and role settings
        </p>
      </div>

      {/* Profile card */}
      <div
        className="rounded-xl border border-border p-5 space-y-5"
        style={{ backgroundColor: "#1A1A1A" }}
        data-ocid="profile.card"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#2A1A00" }}
          >
            <User size={18} style={{ color: "#C8862A" }} />
          </div>
          <h2 className="font-semibold text-white">Profile Details</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-300 text-sm">Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-1 bg-input border-border text-white placeholder:text-gray-500"
              data-ocid="profile.name.input"
            />
          </div>
          <div>
            <Label className="text-gray-300 text-sm">Practitioner Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger
                className="mt-1 bg-input border-border text-white"
                data-ocid="profile.role.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{ backgroundColor: "#1A1A1A" }}
                className="border-border"
              >
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r} className="text-white">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full hover:opacity-90"
            data-ocid="profile.save.submit_button"
            style={{ backgroundColor: "#C8862A", color: "#fff" }}
          >
            {saving ? "Saving…" : "Save Profile"}
          </Button>
        </div>
      </div>

      {/* Platform Modalities */}
      <div
        className="rounded-xl border border-border p-5"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <h2 className="font-semibold mb-4" style={{ color: "#C8862A" }}>
          Platform Modalities
        </h2>
        <ul className="space-y-2">
          {MODALITIES.map((m) => (
            <li
              key={m}
              className="flex items-start gap-2 text-sm text-gray-300"
            >
              <span style={{ color: "#C8862A" }}>•</span>
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
