const razorpay = require("../utils/razorpay");
const crypto = require("crypto"); 
const Subscription = require("../models/Subscription");
const Individual = require("../models/Individual");
const Organization = require("../models/Organization");

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

    console.log("VERIFY BODY:", req.body);

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

    // 🔍 FIND USER TYPE FROM DB
let userType = null;

const individual = await Individual.findById(userId);
if (individual) {
  userType = "individual";
} else {
  const organization = await Organization.findById(userId);
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

    // ✅ RESPONSE
    res.json({
      success: true,
      message: "Payment verified & subscription activated",
    });

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
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