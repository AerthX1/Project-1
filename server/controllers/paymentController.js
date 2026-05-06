const razorpay = require("../utils/razorpay");
const crypto = require("crypto"); 
const Subscription = require("../models/Subscription");
const Individual = require("../models/Individual");
const Organization = require("../models/Organization");
const CarbonPurchase = require("../models/CarbonPurchase");
const sendEmail = require("../utils/sendEmail");
const generateCertificate = require("../utils/generateCertificate");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount required" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      plan,
      duration,
      paymentMethod,
    } = req.body;


    // 🔐 STEP 1: VERIFY SIGNATURE (DO NOT MOVE)
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    
    const {
  type,
  projectId,
  tons
} = req.body;

if (!req.body.type) {
  return res.status(400).json({
    success: false,
    message: "Payment type is required",
  });
}

    // 🔍 FIND USER TYPE FROM DB
let userType = null;

const individual = await Individual.findById(userId);
let organization = null; // 🔥 ADD THIS LINE

if (individual) {
  userType = "individual";
} else {
  organization = await Organization.findById(userId); // 🔥 REMOVE const
  if (organization) {
    userType = "organization";
  }
}

if (!userType) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

// ================= CARBON CREDIT FLOW =================
if (type === "carbon_credit") {
  const CarbonPurchase = require("../models/CarbonPurchase");
  const CarbonProject = require("../models/CarbonCredit"); 

  const project = await CarbonProject.findById(projectId);

    if (!projectId || !tons) {
  return res.status(400).json({
    success: false,
    message: "ProjectId and tons required",
  });
}

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "ProjectId is required",
    });
  }

  if (!tons || tons <= 0) {
  return res.status(400).json({
    success: false,
    message: "Invalid tons value",
  });
}

  if (project.tons < tons) {
    return res.status(400).json({
      success: false,
      message: "Not enough carbon credits available",
    });
  }



  const pricePerTon = project.pricePerTon;
  const subtotal = pricePerTon * tons;

  const platformFee = subtotal * 0.05;
  const gatewayFee = subtotal * 0.02 + 25;
  const gst = (subtotal + platformFee + gatewayFee) * 0.18;

  const totalAmountPaid = subtotal + platformFee + gatewayFee + gst;

const userData = individual || organization;
const certificateId = `CERT-AERTHX-${Date.now()}`;

const certificateUrl = await generateCertificate({
  certificateId,
  userName: userData?.name || userData?.orgName,
  projectName: project.title,
  tons,
});

  await CarbonPurchase.create({


    userId,
    userType,
    userName: userData?.name || userData?.orgName,
    userEmail: userData?.email,

    projectId,
    projectName: project.title,

    tonsBought: tons,
    pricePerTon,

    subtotal,
    platformFee,
    gatewayFee,
    gst,
    totalAmountPaid,

    paymentMethod,
    razorpay_payment_id,
    razorpay_order_id,
    status: "completed",
certificateId,
certificateUrl,
issuedAt: new Date(),
    
  });

const certificateLink = certificateUrl;

try {
 await sendEmail({
  to: userData?.email,
  subject: "🌱 Your Carbon Offset Certificate | AerthX",
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      
      <h2 style="color: #1b5e20; text-align: center;">
        Carbon Offset Confirmation 🌱
      </h2>

      <p style="font-size: 15px; color: #333;">
        Dear <strong>${userData?.name || userData?.orgName}</strong>,
      </p>

      <p style="font-size: 14px; color: #555;">
        Your carbon credit purchase has been successfully completed. Thank you for contributing towards a more sustainable future.
      </p>

      <hr style="margin: 20px 0;" />

      <h3 style="color: #2e7d32;">Transaction Details</h3>

      <table style="width: 100%; font-size: 14px; color: #444;">
        <tr>
          <td><strong>Project</strong></td>
          <td>${project.title || project.name}</td>
        </tr>
        <tr>
          <td><strong>Carbon Offset</strong></td>
          <td>${tons} Tonnes CO₂</td>
        </tr>
        <tr>
          <td><strong>Total Paid</strong></td>
          <td>₹${totalAmountPaid}</td>
        </tr>
      </table>

      <hr style="margin: 20px 0;" />

      <h3 style="color: #2e7d32;">📄 Your Certificate</h3>

      <p style="font-size: 14px; color: #555;">
        Your carbon offset certificate has been issued and is available for verification and download.
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="${certificateLink}" 
           style="background-color: #2e7d32; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
           View Certificate
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">
        You can also access and download your certificate anytime from your AerthX dashboard.
      </p>

      <hr style="margin: 25px 0;" />

      <p style="font-size: 14px; color: #777; text-align: center;">
        Thank you for supporting climate action 🌍 <br/>
        <strong>AerthX Team</strong>
      </p>

    </div>

  </div>
  `,
}); 
} catch (err) {
  console.log("Email failed but payment success:", err.message);
}

  const updated = await CarbonProject.findOneAndUpdate(
  {
    _id: projectId,
    tons: { $gte: tons },
  },
  {
    $inc: { tons: -tons },
  },
  { new: true }
);

if (!updated) {
  return res.status(400).json({
    success: false,
    message: "Stock changed, try again",
  });
}

  return res.json({
    success: true,
    message: "Carbon credits purchased successfully",
  });
}

    // ✅ STEP 2: VALIDATIONS
    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "paymentMethod is required",
      });
    }


    // 🔒 STEP 3: CHECK EXISTING ACTIVE SUBSCRIPTION
    const existing = await Subscription.findOne({
      userId,
      endDate: { $gt: new Date() },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already has an active subscription",
      });
    }

    // 📅 STEP 4: DATE CALCULATION
  // 📅 STEP 4: DATE CALCULATION

if (!["monthly", "yearly"].includes(duration)) {
  return res.status(400).json({
    success: false,
    message: "Invalid duration",
  });
}

const startDate = new Date();
const endDate = new Date(startDate); // important: clone, not new Date()

if (duration === "monthly") {
  endDate.setMonth(endDate.getMonth() + 1);
} else if (duration === "yearly") {
  endDate.setFullYear(endDate.getFullYear() + 1);
}

    // 🧠 STEP 5: NORMALIZE DATA
    const normalizedUserType = userType.toLowerCase();

    // 💾 STEP 6: SAVE TO DATABASE
    await Subscription.create({
      userId,
      userType: normalizedUserType,
      plan,
      duration,
      paymentMethod,
      razorpay_payment_id,
      razorpay_order_id,
      startDate,
      endDate,
      status: "active",
    });

    const userData = individual || organization;

await sendEmail({
  to: userData?.email,
  subject: "🚀 Subscription Activated - AerthX",
  html: `
    <h2>Subscription Activated 🎉</h2>
    <p>Hi ${userData?.name || userData?.orgName},</p>

    <p>Your subscription has been successfully activated.</p>

    <ul>
      <li><strong>Plan:</strong> ${plan}</li>
      <li><strong>Duration:</strong> ${duration}</li>
      <li><strong>Status:</strong> Active</li>
    </ul>

    <p>You're now part of AerthX's sustainability ecosystem.</p>

    <br/>
    <p>— Team AerthX 🌍</p>
  `,
});

    // ✅ RESPONSE
    res.json({
      success: true,
      message: "Payment verified & subscription activated",
    });

  } catch (error) {
  console.error("🔥 VERIFY ERROR FULL:", error);

  res.status(500).json({
    success: false,
    message: error.message, // 🔥 THIS IS IMPORTANT
  });
}
};

exports.getMySubscription = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
      return res.json({
        status: "none",
        plan: null,
      });
    }

    const isActive = subscription.endDate > new Date();

    res.json({
      status: isActive ? "active" : "expired",
      plan: subscription.plan,
      endDate: subscription.endDate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching subscription",
    });
  }
};

exports.getMyCertificates = async (req, res) => {
  try {
    const { userId } = req.params;

    const certificates = await CarbonPurchase.find({
      userId,
      status: "completed",
    }).sort({ createdAt: -1 });

    res.json(certificates);
  }catch (error) {
  console.error("FULL ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
};