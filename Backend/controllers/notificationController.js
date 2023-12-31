const notification = require("../models/notification");

const postNotification = async (req, res) => {
  try {
    const newNotification = new notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getNotification = async (req, res) => {
  try {
    const notifications = await notification
      .find({
        user: req.body.userId,
      })
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data : notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {
    try {
         await notification.findByIdAndDelete(req.params.id)
         res.send({
            success: true,
            message: 'Notification deleted successfully'
         })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
}

const readAllNotifications = async (req, res) => {
  try {
         await notification.updateMany(
          {user : req.body.userId, read : false},
          {$set : {read : true}},
         )
         res.send({
          success : true,
          message : 'All notifications marked as red'
         })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  postNotification,
  getNotification,
  deleteNotification,
  readAllNotifications,
};
