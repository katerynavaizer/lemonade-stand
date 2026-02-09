export const validate = (schema) => (req, res, next) => {
  try {
    // Check if the incoming body matches the Zod rules
    schema.parse(req.body);
    next(); // If valid, let them pass to the Controller
  } catch (err) {
    // If invalid, format the error nicely
    const errorMessages = err.errors.map((e) => e.message).join(", ");

    // Send a 400 Bad Request
    res.status(400).json({
      status: "fail",
      message: errorMessages,
    });
  }
};
