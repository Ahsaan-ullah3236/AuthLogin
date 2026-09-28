import HttpError from "../utils/HttpError.js";

export const validateActivityId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, "Invalid activity id");
  }
  return id;
};

export const validateActivity = (body = {}) => {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";

  if (!title) throw new HttpError(400, "Activity title is required");
  if (title.length > 100 || description.length > 240) {
    throw new HttpError(400, "Title or description is too long");
  }

  return { title, description };
};