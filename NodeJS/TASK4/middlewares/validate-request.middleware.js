const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        return next();
    } catch (error) {
        const errors = error.errors.map(({ path, code, message }) =>
            code === "invalid_type" ? `${path[0]} is required!` : message
        );

        res.status(400).json({ errors });
    }
};


export default validateRequest;