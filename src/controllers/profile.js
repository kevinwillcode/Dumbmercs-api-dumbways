const { profile, user } = require("../../models");

// ============ ADD PROFILE ===============
exports.addProfile = async (req, res) => {
  try {
    let data = req.body;
    const addProfile = await profile.create({
      ...data,
      idUser: req.user.id,
    });

    console.log(addProfile);

    res.status(200).send({
      status: "Success",
      message: "Add profile success",
      data: addProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// ============ UPDATE PROFILE ===============
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    let dataUser = {
      name: req?.body?.name,
    };

    dataUser = JSON.parse(JSON.stringify(dataUser));
    console.log("get data name User : ", dataUser);

    const updateName = await user.update(
      {
        name: dataUser.name,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    profileUser = JSON.parse(JSON.stringify(req.body));
    console.log("get data profile: ", profileUser);

    const updateProfile = await profile.update(
      {
        ...profileUser,
      },
      {
        where: {
          idUser: req.user.id,
        },
      }
    );

    // console.log(addProfile)

    res.status(200).send({
      status: "Success",
      data: {
        nameUpdate: updateName,
        profileUpdate: updateProfile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
