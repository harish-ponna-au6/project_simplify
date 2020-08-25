const Joi = require("@hapi/joi");

module.exports = {
  async registrationValidation(req, res, next) {
    try {
      var { name, email, password, officeName, mobile, address } = req.body;

      const Schemavalidation = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] }
        }),
        password: Joi.string().min(3).max(30).required(),
        officeName: Joi.string().min(3).max(30).required(),
        mobile: Joi.string().length(10).regex(/^\d+$/).required(),
        address: Joi.string().min(3).max(60).required()
      });
      const { error } = Schemavalidation.validate({
        name,
        email,
        password,
        officeName,
        mobile,
        address
      });
      if (error)
        return res.status(400).json({ error: { message: error.message } });
      else next();
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  async orderValidation(req, res, next) {
    try {
      var {
        customerId,
        titleOfOrder,
        typeOfOrder,
        outPutFormat,
        estimatedDateOfCompletion,
        allotedEmployee,
        totalAmountInINR,
        advanceAmountInINR
      } = req.body;
      totalAmountInINR = Number(totalAmountInINR);
      advanceAmountInINR = Number(advanceAmountInINR);
      if (isNaN(totalAmountInINR) || isNaN(advanceAmountInINR))
        return res.status(401).json({ error: { message: "invalid amount" } });
      const Schemavalidation = Joi.object({
        customerId: Joi.string().required(),
        titleOfOrder: Joi.string().min(3).max(30).required(),
        typeOfOrder: Joi.string().min(3).max(30).required(),
        outPutFormat: Joi.string().required(),
        estimatedDateOfCompletion: Joi.string().required(),
        allotedEmployee: Joi.string().min(3).max(30).required(),
        totalAmountInINR: Joi.number().required(),
        advanceAmountInINR: Joi.number().required()
      });
      const { error } = Schemavalidation.validate({
        customerId,
        titleOfOrder,
        typeOfOrder,
        outPutFormat,
        estimatedDateOfCompletion,
        allotedEmployee,
        totalAmountInINR,
        advanceAmountInINR
      });
      if (error)
        return res.status(400).json({ error: { message: error.message } });
      next();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};
