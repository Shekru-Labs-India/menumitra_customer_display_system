export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/customer_display_system_api/cds_login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber }),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("OTP Send Error:", error);
      return { success: false, error: "Failed to send OTP" };
    }
  },

  // Verify OTP
  verifyOTP: async (mobileNumber, otp) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/customer_display_system_api/cds_verify_otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber, otp }),
        }
      );
      const result = await response.json();

      if (result.st === 1) {
        localStorage.setItem("outlet_id", result.outlet_id);
        localStorage.setItem("owner_id", result.owner_id);
        localStorage.setItem("outlet_name", result.outlet_name);
      }

      return result;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return { success: false, error: "Failed to verify OTP" };
    }
  },
};
