export const createBlogCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blog created successfully",
    data: req.body,
  });
};

export const listBlogCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blog list successfully",
    data: req.body,
  });
};

export const editBlogCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blog update successfully",
    data: req.body,
  });
};

export const deleteBlogCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blog delete successfully",
    data: req.body,
  });
};

export const showBlogCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blog show successfully",
    data: req.body,
  });
};

export const blogCommentListCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blogCommentListCtrl successfully",
    data: req.body,
  });
};

export const blogCommentCreateCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blogCommentCtrl successfully",
    data: req.body,
  });
};

export const blogCommentEditCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blogCommentEditCtrl successfully",
    data: req.body,
  });
};

export const blogDeleteCtrl = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    success: false,
    message: "blogDeleteCtrl successfully",
    data: req.body,
  });
};
