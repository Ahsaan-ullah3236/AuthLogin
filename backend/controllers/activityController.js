import * as activityService from "../services/activityService.js";
import {
  validateActivity,
  validateActivityId,
} from "../validators/activityValidators.js";
import HttpError from "../utils/HttpError.js";

export const getActivities = async (req, res) => {
  const activities = await activityService.listActivities(req.user.userId);
  return res.status(200).json({ success: true, data: activities });
};

export const createActivity = async (req, res) => {
  const input = validateActivity(req.body);
  const activity = await activityService.createActivity(req.user.userId, input);

  return res.status(201).json({
    success: true,
    message: "Activity created",
    data: activity,
  });
};

export const updateActivity = async (req, res) => {
  const id = validateActivityId(req.params.id);
  const input = validateActivity(req.body);
  const activity = await activityService.updateActivity(
    req.user.userId,
    id,
    input,
  );

  if (!activity) throw new HttpError(404, "Activity not found");

  return res.status(200).json({
    success: true,
    message: "Activity updated",
    data: activity,
  });
};

export const deleteActivity = async (req, res) => {
  const id = validateActivityId(req.params.id);
  const activity = await activityService.deleteActivity(req.user.userId, id);
  if (!activity) throw new HttpError(404, "Activity not found");

  return res.status(200).json({
    success: true,
    message: "Activity deleted",
    data: activity,
  });
};
