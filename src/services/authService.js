export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/common_api/user_login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber ,role:'manager'}),
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
    // Function to generate a random alphanumeric string of specified length
    const generateRandomSessionId = (length) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let sessionId = "";
      for (let i = 0; i < length; i++) {
        sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return sessionId;
    };
  
    // Generate a 20-character session ID
    const deviceSessId = generateRandomSessionId(20);
  
    try {
      const response = await fetch("https://men4u.xyz/customer_display_system_api/cds_verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp,
          device_sessid: deviceSessId, // Include the generated session ID
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
            device_sessid: deviceSessId, // Store the session ID in localStorage
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
