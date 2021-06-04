const { admin, db } = require('../util/admin');
const { uuid } = require('uuidv4');
const config = require('../util/config');
const firebase = require('firebase');
const { reduceGroupDetails } = require('../util/validators');

//Create Group
exports.createGroup = (req, res) => {
  console.log('Creating Group');
  if (req.body.groupHandle.trim() === '') {
    return res.status(400).json({ groupHandle: 'Handle must not be empty' });
  }
  if (req.user.gHandle !== '') {
    return res.status(400).json({
      groupHandle: "You cannot create a group if you're already in one.",
    });
  }

  const noGroupImg = 'no-group-img.png';

  const newGroup = {
    admin: req.user.handle,
    groupHandle: req.body.groupHandle,
    lowercase: req.body.groupHandle.toLowerCase(),
    location: req.body.location,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    groupImage: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noGroupImg}?alt=media`,
    userCount: 0,
    users: [],
  };

  db.collection('groups')
    .doc(newGroup.groupHandle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ groupHandle: 'This group handle is already taken' });
      } else {
        const resGroup = newGroup;
        resGroup.groupId = doc.id;
        res.json(resGroup);
        return db.doc(`/groups/${newGroup.groupHandle}`).set(newGroup);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getAllGroups = (req, res) => {
  db.collection('groups')
    .where('lowercase', '>=', req.query.queryText.toLowerCase())
    .where('lowercase', '<=', req.query.queryText.toLowerCase() + '\uf8ff')
    .orderBy('lowercase', 'desc')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let groups = [];
      data.forEach((doc) => {
        groups.push({
          groupId: doc.id,
          admin: doc.data().admin,
          body: doc.data().body,
          groupHandle: doc.data().groupHandle,
          location: doc.data().location,
          createdAt: doc.data().createdAt,
          groupImage: doc.data().groupImage,
          userCount: doc.data().userCount,
          users: doc.data().users,
        });
      });
      return res.json(groups);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Fetch one group
exports.getGroup = (req, res) => {
  let groupData = {};
  db.doc(`/groups/${req.params.groupId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Group not found' });
      }
      groupData = doc.data();
      return res.json(groupData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.joinGroup = (req, res) => {
  console.log('Adding User');
  const groupDocument = db.doc(`/groups/${req.body.groupHandle}`);
  let groupData;

  groupDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        groupData = doc.data();
        groupData.userCount++;
        groupData.users = [...groupData.users, req.user];
        return db
          .doc(`groups/${req.body.groupHandle}`)
          .update({ userCount: groupData.userCount, users: groupData.users })
          .then(() => {
            db.doc(`users/${req.user.handle}`)
              .update({
                gHandle: req.body.groupHandle,
              })
              .then(() => {
                return res.json({ message: 'User added successfully' });
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({ error: "Couldn't update user's group" });
              });
          })
          .catch((err) => {
            return res.status(500).json({ error: 'Something went wrong' });
          });
      } else {
        return res.status(404).json({ error: 'Group not found' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.leaveGroup = (req, res) => {
  console.log('Removing User');
  const groupDocument = db.doc(`/groups/${req.body.groupHandle}`);
  let groupData;

  groupDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        groupData = doc.data();
        groupData.userCount--;
        let index = groupData.users.findIndex(
          (user) => user.handle === req.user.handle
        );
        groupData.users.splice(index, 1);
        console.log(groupData.users);
        return db
          .doc(`groups/${req.body.groupHandle}`)
          .update({ userCount: groupData.userCount, users: groupData.users })
          .then(() => {
            db.doc(`users/${req.user.handle}`)
              .update({
                gHandle: '',
              })
              .then(() => {
                return res.json({ message: 'User successfully removed' });
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({ error: "Couldn't update user's group" });
              });
          })
          .catch((err) => {
            return res.status(500).json({ error: 'Something went wrong' });
          });
      } else {
        return res.status(404).json({ error: 'Group not found' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.deleteGroup = (req, res) => {
  var document = db.doc(`/groups/${req.user.gHandle}`);

  let groupData;
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Group not found' });
      }
      groupData = doc.data();
      if (groupData.groupHandle !== req.user.groupHandle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else if (groupData.admin !== req.user.handle) {
        return res.status(402).json({ error: 'Only admin can delete group' });
      }
    })
    .then(() => {
      groupData.users.forEach((user) => {
        db.doc(`/users/${user.handle}`).update({ groupId: '', gHandle: '' });
      });
      return document.delete();
    })
    .then(() => {
      res.json({ message: 'Post deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.uploadImageGroup = (req, res) => {
  console.log('Uploading image');
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const groupImage = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/groups/${req.user.gHandle}`).update({ groupImage });
      })
      .then(() => {
        return res.json({ message: 'image uploaded successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};

exports.addGroupDetails = (req, res) => {
  let groupDetails = reduceGroupDetails(req.body);
  console.log(req.user.gHandle);
  db.doc(`/groups/${req.user.gHandle}`)
    .update(groupDetails)
    .then(() => {
      return res.json({ message: 'Details added successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
