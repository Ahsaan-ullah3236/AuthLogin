export default function ActivityList({
  activities,
  isLoading,
  error,
  onEdit,
  onDelete,
}) {
  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        Loading activities...
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" className="py-8 text-center text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (activities.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        No activities yet. Add one to get started.
      </p>
    );
  }

  return activities.map((activity, index) => (
    <div
      key={activity.id}
      className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${index === 0 ? "bg-[#efffcf] text-lime-700" : "bg-slate-100 text-slate-600"}`}
      >
        {index === 0 ? "✓" : "↗"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-slate-800">{activity.title}</p>
        <p className="mt-1 text-xs text-slate-500">
          {activity.description || "No description"}
        </p>
      </div>
      <span className="shrink-0 text-xs font-semibold text-slate-400">
        {new Date(activity.created_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </span>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onEdit(activity)}
          title={`Edit ${activity.title}`}
          aria-label={`Edit ${activity.title}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <span aria-hidden="true">✎</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(activity.id)}
          title={`Delete ${activity.title}`}
          aria-label={`Delete ${activity.title}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-700"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  ));
}