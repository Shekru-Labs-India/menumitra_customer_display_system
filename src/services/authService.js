export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/common_api/user_login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber ,role:'cds'}),
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
      const response = await fetch("https://men4u.xyz/customer_display_system_api/cds_verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp,
      
        }),
      });
  
      const result = await response.json();
  
      if (result.st === 1) {
        const { name, role, outlet_name, outlet_id } = result;
  
        localStorage.setItem(
          "authData",
          JSON.stringify({
            name,
            role,
            outlet_name,
            outlet_id,
          })
        );
      }
  
      return result;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return { success: false, error: "Failed to verify OTP" };
    }
  },
  
};
