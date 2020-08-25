const router = require("express").Router();
const {
  customerLogin,
  customerForgotPasswordOtp,
  customerForgotPasswordReset,
  customerChangePassword,
  customerLogout,
  customerOrdersInEditor,
  customerSearchOrders,
  customerViewSingleOrder,
  customerAllEditors,
  customerProfile
} = require("../controllers/customerControllers");
const { authenticateCustomer } = require("../middlewares/authenticate");

//------------------------------get routes-------------------------

router.get(`/api/customer/profile`, authenticateCustomer, customerProfile);
router.get(
  `/api/customer/all-editors`,
  authenticateCustomer,
  customerAllEditors
);
router.get(
  `/api/customer/orders-in-specific-editor/:editorId`,
  authenticateCustomer,
  customerOrdersInEditor
);
router.get(
  `/api/customer/search/orders-by-title`,
  authenticateCustomer,
  customerSearchOrders
); //?titleOfOrder={query}
router.get(
  `/api/customer/view-single-order/:orderId`,
  authenticateCustomer,
  customerViewSingleOrder
);

//------------------------------post routes-------------------------

router.post(`/api/customer/login`, customerLogin);

//------------------------------update routes-------------------------

router.patch(
  `/api/customer/change-password`,
  authenticateCustomer,
  customerChangePassword
);
router.patch(`/api/customer/forgot-password-otp`, customerForgotPasswordOtp);
router.patch(
  `/api/customer/forgot-password-reset`,
  customerForgotPasswordReset
);

//------------------------------delete routes-------------------------

router.delete(`/api/customer/logout`, authenticateCustomer, customerLogout);

module.exports = router;
