import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Gender, Patient } from "../backend.d";
import { useActor } from "../hooks/useActor";

export default function Patients() {
  const { actor, isFetching } = useActor();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [contact, setContact] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPatients = useCallback(
    async (search?: string) => {
      if (!actor) return;
      setLoading(true);
      try {
        const list = search?.trim()
          ? await actor.searchPatients(search.trim())
          : await actor.listPatients();
        setPatients(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [actor],
  );

  useEffect(() => {
    if (!actor || isFetching) return;
    loadPatients();
  }, [actor, isFetching, loadPatients]);

  function handleSearch(val: string) {
    setSearchText(val);
    loadPatients(val);
  }

  async function handleAddPatient() {
    if (!actor) return;
    if (!name.trim() || !age) {
      toast.error("Name and age are required");
      return;
    }
    setSaving(true);
    try {
      let genderVal: Gender;
      if (gender === "male") genderVal = { __kind__: "male", male: null };
      else if (gender === "female")
        genderVal = { __kind__: "female", female: null };
      else genderVal = { __kind__: "other", other: "other" };

      await actor.addPatient(
        name.trim(),
        BigInt(age),
        genderVal,
        contact.trim(),
      );
      toast.success("Patient added successfully");
      setDialogOpen(false);
      setName("");
      setAge("");
      setGender("male");
      setContact("");
      loadPatients();
    } catch (e) {
      console.error(e);
      toast.error("Failed to add patient");
    } finally {
      setSaving(false);
    }
  }

  function genderLabel(g: Gender) {
    if (g.__kind__ === "male") return "Male";
    if (g.__kind__ === "female") return "Female";
    return "Other";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Patients</h1>
          <p className="text-sm text-gray-400 mt-1">
            {patients.length} registered patients
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              data-ocid="patients.add_patient.open_modal_button"
              style={{ backgroundColor: "#C8862A", color: "#fff" }}
              className="hover:opacity-90"
            >
              <Plus size={15} className="mr-1.5" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent
            className="border-border"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            <DialogHeader>
              <DialogTitle className="text-white">Add New Patient</DialogTitle>
            </DialogHeader>
            <div
              className="space-y-4 pt-2"
              data-ocid="patients.add_patient.modal"
            >
              <div>
                <Label className="text-gray-300 text-sm">Full Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Patient full name"
                  className="mt-1 bg-input border-border text-white placeholder:text-gray-500"
                  data-ocid="patients.name.input"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm">Age</Label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="mt-1 bg-input border-border text-white placeholder:text-gray-500"
                  data-ocid="patients.age.input"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-sm">Gender</Label>
                <Select
                  value={gender}
                  onValueChange={(v) =>
                    setGender(v as "male" | "female" | "other")
                  }
                >
                  <SelectTrigger
                    className="mt-1 bg-input border-border text-white"
                    data-ocid="patients.gender.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{ backgroundColor: "#1A1A1A" }}
                    className="border-border"
                  >
                    <SelectItem value="male" className="text-white">
                      Male
                    </SelectItem>
                    <SelectItem value="female" className="text-white">
                      Female
                    </SelectItem>
                    <SelectItem value="other" className="text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300 text-sm">Contact</Label>
                <Input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone or email"
                  className="mt-1 bg-input border-border text-white placeholder:text-gray-500"
                  data-ocid="patients.contact.input"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-border text-gray-300"
                  data-ocid="patients.add_patient.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPatient}
                  disabled={saving}
                  data-ocid="patients.add_patient.submit_button"
                  style={{ backgroundColor: "#C8862A", color: "#fff" }}
                  className="hover:opacity-90"
                >
                  {saving ? "Saving…" : "Add Patient"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <Input
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search patients…"
          className="pl-9 bg-input border-border text-white placeholder:text-gray-500"
          data-ocid="patients.search.search_input"
        />
      </div>

      {/* List */}
      {loading ? (
        <div
          className="text-gray-500 text-sm"
          data-ocid="patients.list.loading_state"
        >
          Loading patients…
        </div>
      ) : patients.length === 0 ? (
        <div
          className="rounded-xl border border-border p-8 text-center"
          style={{ backgroundColor: "#1A1A1A" }}
          data-ocid="patients.list.empty_state"
        >
          <User size={36} className="mx-auto mb-3 text-gray-600" />
          <p className="text-gray-400">No patients found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {patients.map((p, i) => (
            <div
              key={p.id.toString()}
              data-ocid={`patients.list.item.${i + 1}`}
              className="rounded-xl border border-border p-4 flex items-center gap-4"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#2A1A00" }}
              >
                <User size={18} style={{ color: "#C8862A" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{p.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {genderLabel(p.gender)} · {p.age.toString()} yrs ·{" "}
                  {p.contact || "No contact"}
                </div>
              </div>
              <div className="text-xs text-gray-500">ID #{p.id.toString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
