const Joi = require("joi");

const createWorkflowSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).allow("").optional()
});

const updateWorkflowSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(500).allow("").optional(),
    status: Joi.string()
        .valid("Draft", "Active", "Inactive")
        .optional()
}).min(1);

const validateCreateWorkflow = (req, res, next) => {
    const { error } = createWorkflowSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

const validateUpdateWorkflow = (req, res, next) => {
    const { error } = updateWorkflowSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

module.exports = {
    validateCreateWorkflow,
    validateUpdateWorkflow
};