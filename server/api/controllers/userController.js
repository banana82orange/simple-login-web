
export const getProfile = (req, res) => {
  const user = req.user;

  res.json({
    message: "User profile fetched successfully",
    user,
  });
};
