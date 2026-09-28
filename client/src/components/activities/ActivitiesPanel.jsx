import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../lib/api";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";

export default function ActivitiesPanel({ isFormOpen, onFormOpenChange }) {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadActivities = async () => {
      if (!localStorage.getItem("accessToken")) {
        setError("Please sign in to view your activities.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/activities", {
          signal: controller.signal,
        });
        setActivities(response.data.data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load activities.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadActivities();
    return () => controller.abort();
  }, []);

  const openCreateForm = () => {
    setEditingActivityId(null);
    setTitle("");
    setDescription("");
    onFormOpenChange(true);
  };

  const openEditForm = (activity) => {
    setEditingActivityId(activity.id);
    setTitle(activity.title);
    setDescription(activity.description);
    onFormOpenChange(true);
  };

  const saveActivity = async (event) => {
    event.preventDefault();
    const input = { title: title.trim(), description: description.trim() };
    if (!input.title || isSaving) return;

    setIsSaving(true);
    try {
      if (editingActivityId === null) {
        const response = await api.post("/activities", input);
        setActivities((current) => [response.data.data, ...current]);
        toast.success("Activity added");
      } else {
        const response = await api.put(
          `/activities/${editingActivityId}`,
          input,
        );
        setActivities((current) =>
          current.map((activity) =>
            activity.id === editingActivityId ? response.data.data : activity,
          ),
        );
        toast.success("Activity updated");
      }
      setError("");
      onFormOpenChange(false);
    } catch (requestError) {
      toast.error(
        requestError.response?.data?.message || "Unable to save activity.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      await api.delete(`/activities/${activityId}`);
      setActivities((current) =>
        current.filter((activity) => activity.id !== activityId),
      );
      if (editingActivityId === activityId) onFormOpenChange(false);
      toast.success("Activity deleted");
    } catch (requestError) {
      toast.error(
        requestError.response?.data?.message || "Unable to delete activity.",
      );
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-extrabold tracking-tight text-slate-950">
            Recent activity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            A quick look at your account
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="text-xs font-bold text-slate-500 hover:text-slate-950"
        >
          + Add activity
        </button>
      </div>
      {isFormOpen && (
        <ActivityForm
          title={title}
          description={description}
          isEditing={editingActivityId !== null}
          isSaving={isSaving}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={saveActivity}
          onCancel={() => onFormOpenChange(false)}
        />
      )}
      <div className="mt-7 space-y-1">
        <ActivityList
          activities={activities}
          isLoading={isLoading}
          error={error}
          onEdit={openEditForm}
          onDelete={deleteActivity}
        />
      </div>
    </section>
  );
}