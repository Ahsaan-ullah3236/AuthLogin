import HttpError from "../utils/HttpError.js";

export const validateActivityId = (value) => {
  const id = typeof value === "string" ? value.trim() : "";
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(id)) {
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