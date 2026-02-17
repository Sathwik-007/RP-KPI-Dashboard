import * as dashboardService from "../services/dashboard.service.js";

export const getDashboardData = async (req, res) => {
  try {
    const { status, priority, space, startDate, endDate } = req.query;
    const userOrgId = req.user.organizationId;

    const data = await dashboardService.getDashboardStats(
      { status, priority, space, startDate, endDate },
      userOrgId
    );

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};