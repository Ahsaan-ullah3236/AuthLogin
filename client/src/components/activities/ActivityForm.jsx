export default function ActivityForm({
  title,
  description,
  isEditing,
  isSaving,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 space-y-3 border-y border-slate-100 py-5"
    >
      <h3 className="text-sm font-bold text-slate-800">
        {isEditing ? "Edit activity" : "New activity"}
      </h3>
      <label className="block text-xs font-semibold text-slate-600">
        Title
        <input
          autoFocus
          required
          maxLength={100}
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
          placeholder="Activity title"
        />
      </label>
      <label className="block text-xs font-semibold text-slate-600">
        Description
        <textarea
          maxLength={240}
          rows={2}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-lime-600 focus:ring-2 focus:ring-lime-100"
          placeholder="Add a short description"
        />
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-[#101820] px-3 py-2 text-xs font-bold text-white hover:bg-slate-700"
        >
          {isSaving
            ? "Saving..."
            : isEditing
              ? "Save changes"
              : "Add activity"}
        </button>
      </div>
    </form>
  );
}