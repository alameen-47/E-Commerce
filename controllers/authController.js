import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import transporter from "../config/nodemailer.js";
import { t } from "i18next";
import translateText from "../services/translateText.js";

export const registerController = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    if (!email) {
      return res.send({ message: t("Email is Required") });
    }
    if (!password) {
      return res.send({ message: t("Password is Required") });
    }

    //check user
    const existinguser = await userModel.findOne({ email });
    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: t("User already exists,Please Sign In"),
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      success: true,
      message: t("User Registered Succesfully"),
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: t("Error in Registration"),
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and length should be 6 character",
      });
    }
    const user = await userModel.findById(req.user._id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || email.name,
        phone: phone || phone.name,
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Profile Updated Succesfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to Update Profile",
      error,
    });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const { street, province, zipCode, city } = req.body;
    const user = await userModel.findById(req.user._id);
    const updatedAddress = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        "address.street": street,
        "address.city": city,
        "address.province": province,
        "address.zipCode": zipCode,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      updatedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error,
    });
  }
};
//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validationn
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: t("Invalid email or password"),
      });
    }
    //ceck user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: t("Email is not registered"),
      });
    }
    //compare passwords

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: t("Invalid Password"),
      });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: t("Signed In Successfully"),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        // address: user.address,
        // zipCode: user.zipCode,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Error in login"),
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: t("Email is Required") });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: t("User not found, please check your email."),
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Update user with OTP and expiration time
    user.otp = hashedOtp;
    user.otpExpires = Date.now() + 520000; // 2 minutes expiry
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: "rawadmall.info@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset of Your Rawad Mall Account",
      text: `Your OTP for password reset of Your Rawad Mall Account is ${otp}. It will expire in 2 minutes.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: t("Error sending email") });
      }
      console.log(info); // Log the information about the sent email

      return res
        .status(200)
        .json({ success: true, message: t("OTP sent successfully") });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Something went wrong!"),
      error,
    });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    // Validate inputs
    if (!email || !otp || !newPassword) {
      return res.status(400).send({ message: t("All fields are required") });
    }

    const user = await userModel.findOne({ email });
    // Validate user existence
    if (!user) {
      return res.status(404).send({
        success: false,
        message: t("User not found, please check your email"),
      });
    }

    // Validate OTP expiration
    if (Date.now() > user.otpExpires) {
      return res.status(400).send({ message: t("OTP expired") });
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).send({ message: t("Invalid OTP") });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: t("Password Changed Successfully"),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Something went wrong!"),
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Failed to Get Orders"),
      error,
    });
  }
};

//cancel order
export const cancelOrderController = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findByIdAndDelete(id);
    // const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).send({
        success: false,
        message: t("Order not found"),
      });
    }

    // await orderModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: t("Order Cancelled Succesfully"),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Error While Cancelling Order"),
      error,
    });
  }
};

//admin all-orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({});
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Error While Geting Orders"),
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    let orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Error while updating order status"),
      error,
    });
  }
};

//admin all-users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: { $ne: 1 } }) // Exclude users with role == 1
      .select("phone name email address")
      .sort({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: t("Error While Geting All User Details"),
      error,
    });
  }
};

// //translationn controller
// export const translationController = async (req, res) => {
//   try {
//     const { text, targetLanguage } = req.body;
//     const translatedText = await translateText(text, targetLanguage);
//     res.json({ translatedText });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
