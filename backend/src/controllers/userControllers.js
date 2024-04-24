import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler.js";

export const registerUser = tryCatchAsyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const usernameExists = await User.findOne({ username: username.trim() });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const emailExists = await User.findOne({ email: email.trim() });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const registeredUser = await User.create({
    fullname: fullname.trim(),
    email: email.trim(),
    username: username.trim(),
    password,
    publicLists: [],
    privateLists: [],
  });
  if (!registeredUser) {
    res.status(400);
    throw new Error("Something went wrong");
  }

  const token = generateToken(registeredUser._id);
  res.json({
    message: "Registration Successful",
    token,
    user: {
      fullname: registeredUser.fullname,
      email: registeredUser.email,
      username: registeredUser.username,
      publicLists: registeredUser.publicLists,
      privateLists: registeredUser.privateLists,
    },
  });
});
export const loginUser = tryCatchAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("No such Username found");
  }

  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    res.status(400);
    throw new Error("Wrong password");
  }

  const token = generateToken(user._id);
  res.json({
    message: "Login Successful",
    token,
    user: {
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      publicLists: user.publicLists,
      privateLists: user.privateLists,
    },
  });
});
export const updateUser = tryCatchAsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const user = req.user;

  if (email) user.email = email;
  if (fullname) user.fullname = fullname;
  if (password) user.password = password;

  const updatedUser = await user.save();
  res.json({
    message: "Details Updated",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      publicLists: updatedUser.publicLists,
      privateLists: updatedUser.privateLists,
    },
  });
});

export const userProfile = tryCatchAsyncHandler(async (req, res) => {
  const user = req.user;
  res.json({ user });
});

export const addPrivateList = tryCatchAsyncHandler(async (req, res) => {
  const user = req.user;
  const { listName } = req.body;

  const listNameExists = user.privateLists.some(
    (list) => list.listName === listName
  );
  if (listNameExists) {
    res.status(400);
    throw new Error("List Name already exists");
  }

  user.privateLists = [...user.privateLists, { listName, animes: [] }];
  const updatedUser = await user.save();

  res.json({
    message: listName + " Added",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      publicLists: updatedUser.publicLists,
      privateLists: updatedUser.privateLists,
    },
  });
});
export const addPublicList = tryCatchAsyncHandler(async (req, res) => {
  const user = req.user;
  const { listName } = req.body;

  const listNameExists = user.publicLists.some(
    (list) => list.listName === listName
  );
  if (listNameExists) {
    res.status(400);
    throw new Error("List Name already exists");
  }

  user.publicLists = [...user.publicLists, { listName, animes: [], views: 0 }];
  const updatedUser = await user.save();

  res.json({
    message: listName + " Added",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      publicLists: updatedUser.publicLists,
      privateLists: updatedUser.privateLists,
    },
  });
});

export const deletePrivateList = tryCatchAsyncHandler(async (req, res) => {
  const user = req.user;
  const { listId } = req.body;

  if (!listId) {
    res.status(400);
    throw new Error("listId is required");
  }

  const checkIfListExists = user.privateLists.some(
    (list) => String(list._id) === String(listId)
  );
  if (!checkIfListExists) {
    res.status(404);
    throw new Error("List not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $pull: {
        privateLists: { _id: listId },
      },
    },
    { new: true, select: "-password" }
  );

  res.json({
    message: "Deleted Successfully",
    user: updatedUser,
  });
});
export const deletePublicList = tryCatchAsyncHandler(async (req, res) => {
  const user = req.user;
  const { listId } = req.body;

  if (!listId) {
    res.status(400);
    throw new Error("listId is required");
  }

  const checkIfListExists = user.publicLists.some(
    (list) => String(list._id) === String(listId)
  );
  if (!checkIfListExists) {
    res.status(404);
    throw new Error("List not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $pull: {
        publicLists: { _id: listId },
      },
    },
    { new: true, select: "-password" }
  );

  res.json({
    message: "Deleted Successfully",
    user: updatedUser,
  });
});

export const addAnimeToPrivateList = tryCatchAsyncHandler(async (req, res) => {
  const { animeData, listId, user } = req;

  const privateList = user.privateLists.find(
    (list) => String(list._id) === String(listId)
  );
  if (!privateList) {
    res.status(400);
    throw new Error("No list found.");
  }

  const isAnimeInList = privateList.animes.some(
    (anime) => anime.title === animeData.title
  );
  if (isAnimeInList) {
    res.status(400);
    throw new Error("Anime is already added.");
  }

  privateList.animes.push(animeData);
  const updatedUser = await user.save();

  res.json({
    message: "Anime Added",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      publicLists: updatedUser.publicLists,
      privateLists: updatedUser.privateLists,
    },
  });
});
export const addAnimeToPublicList = tryCatchAsyncHandler(async (req, res) => {
  const { animeData, listId, user } = req;

  const publicList = user.publicLists.find(
    (list) => String(list._id) === String(listId)
  );
  if (!publicList) {
    res.status(400);
    throw new Error("No list found.");
  }

  const isAnimeInList = publicList.animes.some(
    (anime) => anime.title === animeData.title
  );
  if (isAnimeInList) {
    res.status(400);
    throw new Error("Anime is already added.");
  }

  publicList.animes.push({ ...animeData, views: 0 });
  const updatedUser = await user.save();

  res.json({
    message: "Anime Added",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      publicLists: updatedUser.publicLists,
      privateLists: updatedUser.privateLists,
    },
  });
});

export const removeAnimeFromPrivateList = tryCatchAsyncHandler(
  async (req, res) => {
    const { user } = req;
    const { animeId, listId } = req.body;

    const privateList = user.privateLists.find(
      (list) => String(list._id) === String(listId)
    );
    if (!privateList) {
      res.status(400);
      throw new Error("No list found.");
    }

    const isAnimeInList = privateList.animes.some(
      (anime) => String(anime._id) === String(animeId)
    );
    if (!isAnimeInList) {
      res.status(400);
      throw new Error("No such anime found.");
    }

    privateList.animes.pull({ _id: animeId });
    const updatedUser = await user.save();

    res.json({
      message: "Anime Removed",
      user: {
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        username: updatedUser.username,
        publicLists: updatedUser.publicLists,
        privateLists: updatedUser.privateLists,
      },
    });
  }
);
export const removeAnimeFromPublicList = tryCatchAsyncHandler(
  async (req, res) => {
    const { user } = req;
    const { animeId, listId } = req.body;

    const publicList = user.publicLists.find(
      (list) => String(list._id) === String(listId)
    );
    if (!publicList) {
      res.status(400);
      throw new Error("No list found.");
    }

    const isAnimeInList = publicList.animes.some(
      (anime) => String(anime._id) === String(animeId)
    );
    if (!isAnimeInList) {
      res.status(400);
      throw new Error("No such anime found.");
    }

    publicList.animes.pull({ _id: animeId });
    const updatedUser = await user.save();

    res.json({
      message: "Anime Removed",
      user: {
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        username: updatedUser.username,
        publicLists: updatedUser.publicLists,
        privateLists: updatedUser.privateLists,
      },
    });
  }
);
