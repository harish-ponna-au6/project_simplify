// NPM Package
const router = require("express").Router();

// controllers
const {
  adminForgotPasswordOtp,
  adminForgotPasswordReset,
  adminProfile,
  adminLogin,
  adminFilterEditors,
  adminSearchEditors,
  adminViewSingleEditor,
  adminUpdateEditor,
  adminLogout,
  adminChangePassword,
  adminCount
} = require("../controllers/adminControllers");

// middlewares
const { authenticateAdmin } = require("../middlewares/authenticate");

// --------------------------get routes------------------------------------------
router.get(`/api/admin/profile`, authenticateAdmin, adminProfile); //?status = requested || acitve || blcoked
router.get(`/api/admin/count`, authenticateAdmin, adminCount); //?status = requested || acitve || blcoked
router.get(`/api/admin/filter-editors`, authenticateAdmin, adminFilterEditors); //?status = requested || acitve || blcoked
router.get(
  `/api/admin/search/editors-by-office-name`,
  authenticateAdmin,
  adminSearchEditors
); //?officeName = ${query}
router.get(
  `/api/admin/view-single-editor/:editorId`,
  authenticateAdmin,
  adminViewSingleEditor
);

// --------------------------post routes------------------------------------------
router.post(`/api/admin/login`, adminLogin);

// --------------------------udpate routes------------------------------------------
router.patch(
  `/api/admin/change-password`,
  authenticateAdmin,
  adminChangePassword
);
router.patch(`/api/admin/forgot-password-otp`, adminForgotPasswordOtp);
router.patch(`/api/admin/forgot-password-reset`, adminForgotPasswordReset);
router.patch(
  `/api/admin/update-editor/:editorId`,
  authenticateAdmin,
  adminUpdateEditor
); //?status = ${query}

// --------------------------delete routes------------------------------------------
router.delete(`/api/admin/logout`, authenticateAdmin, adminLogout);

module.exports = router;
