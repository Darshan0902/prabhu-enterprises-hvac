import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON payloads
  app.use(express.json());

  // API Route: Handle professional contact and dispatch submissions
  app.post("/api/submit-form", async (req, res) => {
    try {
      const { name, email, phone, acType, msg } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Required details (name, email, phone) are missing." });
      }

      // Read SMTP transport credentials
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      let emailSentReal = false;
      let statusInfo = "Successfully simulated";

      // Formatted HTML details template
      const formattedDetailsHtml = `
        <table style="border-collapse: collapse; width: 100%; border: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <tr style="background-color: #0f172a; color: #ffffff;">
            <th style="padding: 12px 16px; text-align: left; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Dispatch coordinates</th>
            <th style="padding: 12px 16px; text-align: left; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Input Parameter Detail</th>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155; font-size: 13px; font-family: monospace;">CLIENT_NAME</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${name}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155; font-size: 13px; font-family: monospace;">EMAIL_ID_COORDINATE</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #ff69b4; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #ff69b4; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155; font-size: 13px; font-family: monospace;">PHONE_CONTACT</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600;">${phone}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155; font-size: 13px; font-family: monospace;">AC_SYSTEM_CATG</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; text-transform: uppercase; font-weight: 700;">${acType}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155; font-size: 13px; font-family: monospace;">CLIENT_RAW_MESSAGE</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${msg || "No message supplied by the client."}</td>
          </tr>
        </table>
      `;

      // 1. Professional Admin Alert Template
      const notificationBodyAdmin = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 20px auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <div style="border-bottom: 3px solid #ff69b4; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase;">PRABHU ENTERPRISES</h2>
            <span style="font-size: 10px; color: #ff69b4; font-family: monospace; font-weight: bold; tracking-widest: 0.1em; text-transform: uppercase;">SYSTEM BACKEND ROUTING | JAI BAPPA</span>
          </div>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            Prabhu Admin Gate, a new commercial inquiry has been registered on the web portal. Please respond immediately or arrange diagnostic routing:
          </p>
          ${formattedDetailsHtml}
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-family: monospace; text-align: center;">
            [AUTHENTIC PORTAL SIGNAL LOGGED ON ${new Date().toISOString()}]
          </div>
        </div>
      `;

      // 2. Professional User Handshake Acknowledgment Template
      const acknowledgementBodyUser = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 20px auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 28px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase;">PRABHU ENTERPRISES</h2>
            <span style="font-size: 11px; letter-spacing: 0.15em; color: #ff69b4; font-weight: 700; text-transform: uppercase; display: block; margin-top: 4px;">Pro-Zone III Inverter Specialty</span>
          </div>
          
          <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin-top: 0;">Dear ${name},</p>
          
          <p style="color: #475569; font-size: 14.5px; line-height: 1.6; margin-bottom: 16px;">
            Thank you for contacting <strong>Prabhu Enterprises</strong> regarding your <strong>${acType.toUpperCase()}</strong> cooling equipment. We have successfully logged your technical inquiry in our system.
          </p>
          
          <p style="color: #475569; font-size: 14.5px; line-height: 1.6; margin-bottom: 24px;">
            Our expert senior service engineer in Mahim headquarter has been assigned to construct a professional analysis of your cooling load. We will officially reach out to you or trigger a local technician dispatch <strong>within the next 3 business days</strong>.
          </p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 28px; border-left: 4px solid #ff69b4; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 13.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Submitted System Specifications:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13.5px; line-height: 1.6;">
              <li style="margin-bottom: 4px;"><strong>Point of Contact:</strong> ${phone}</li>
              <li style="margin-bottom: 4px;"><strong>AC / Unit Category:</strong> ${acType.toUpperCase()}</li>
              <li><strong>Your Comment:</strong> ${msg || "N/A"}</li>
            </ul>
          </div>
          
          <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            If on-site operations are facing an emergency technical failure or high temperature chemical hazard, please call our 24/7 central coordination desk directly at our Mahim main depot to trigger rapid mechanical response.
          </p>
          
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 24px;" />
          
          <div style="color: #64748b; font-size: 13px; line-height: 1.5;">
            <p style="margin: 0; font-weight: 700; color: #0f172a;">Engineering & Service Command Wing</p>
            <p style="margin: 2px 0 0 0; font-weight: 700; color: #ff69b4;">PRABHU ENTERPRISES (Est. 1992)</p>
            <p style="margin: 1px 0 0 0; font-size: 12px;">Mahim, Mumbai, Maharashtra, India</p>
          </div>
        </div>
      `;

      // Send the real emails if SMTP details are defined
      if (smtpHost && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // 1. Mail to Prabhu Admin (both prabhudarshan09@gmail.com and prabhuenterprises@gmx.com)
        await transporter.sendMail({
          from: `"Prabhu Enterprises Portal" <${smtpUser}>`,
          to: "prabhudarshan09@gmail.com, prabhuenterprises@gmx.com",
          subject: `🚨 [Portal Dispatch Request] - ${name} (${acType.toUpperCase()})`,
          html: notificationBodyAdmin,
        });

        // 2. Mail to User (Acknowledgement)
        await transporter.sendMail({
          from: `"Prabhu Enterprises Service" <${smtpUser}>`,
          to: email,
          subject: `🛠️ Inquiry Received: Prabhu Enterprises Dispatch Team`,
          html: acknowledgementBodyUser,
        });

        emailSentReal = true;
        statusInfo = "Successfully dispatched emails through SMTP mail server";
      } else {
        console.warn("SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not defined. Simulating HTML templates in development logs:");
        console.log("---------------------- SIMULATOR BOUNDS ----------------------");
        console.log(`[TO ADMINS - prabhudarshan09@gmail.com, prabhuenterprises@gmx.com]:`);
        console.log(notificationBodyAdmin);
        console.log(`[MAIL TO CLIENT - ${email}]:`);
        console.log(acknowledgementBodyUser);
        console.log("------------------------ END OF LOGS ------------------------");
      }

      res.json({
        success: true,
        realEmail: emailSentReal,
        message: "Portal inquiry successfully processed!",
        info: statusInfo,
        data: { name, email, phone, acType, msg }
      });
    } catch (err: any) {
      console.error("Error logging contact inquiry to Express backend:", err);
      res.status(500).json({ error: "System failed logging the inquiry on Server", details: err.message });
    }
  });

  // Handle Vite middleware for development vs serve static built bundle in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MASTER SERVER] Full-stack application bound successfully on host 0.0.0.0 and port ${PORT}`);
  });
}

startServer();
