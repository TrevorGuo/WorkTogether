const { db } = require("../util/admin");
console.log(db);
const { uuid } = require("uuidv4");


//Create Group
exports.createGroup = (req, res) => {
    if (req.body.handle.trim() === "") {
        return res.status(400).json({ body: "Handle must not be empty" });
      }
    const newGroup = {
      admin: req.user.handle,
      groupHandle: req.body.handle,
      createdAt: new Date().toISOString(),
      userCount: 1,
      users: [req.user],
    };
    db.collection("groups")
    .add(newGroup)
    .then((doc) => {
      const resGroup = newGroup;
      resGroup.groupId = doc.id;
      res.json(resGroup);
      req.user.groupId = doc.id;
      req.user.gHandle = req.body.handle;
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};


// Fetch one post
exports.getGroup = (req, res) => {
    let groupData = {};
    db.doc(`/groups/${req.params.groupId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: "Group not found" });
        }
        groupData = doc.data();
        return groupData;
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };


exports.joinGroup = (req, res) => {
    var group = db
    .collection("groups")
    .where("groupHandle", "==", req.body.handle)
    .limit(1);
    
    if(group.userCount > 9){
        return res.status(404).json({ error: "Group is full" });
    }
    else{
        group.update({
            userCount: firebase.firestore.FieldValue.increment(1)
        });
        group.update({
            users: firebase.firestore.FieldValue.arrayUnion(req.user)
        });
        req.user.update({
            groupId: group.groupId,
            gHandle: group.groupHandle
        });
    }
};

exports.leaveGroup = (req, res) => {
    var group = db
    .collection("groups")
    .where("groupHandle", "==", req.body.handle)
    .limit(1);
    
    if(req.user.gHandle !== group.groupHandle){
        return res.status(404).json({ error: "You are already not in this group." });
    }
    else{
        group.update({
            userCount: firebase.firestore.FieldValue.increment(-1)
        });
        group.update({
            users: firebase.firestore.FieldValue.arrayRemove(req.user)
        });
        req.user.update({
            groupId: null,
            gHandle: null
        });
    }
};



  exports.deleteGroup = (req, res) => {
    var document = db.doc(`/groups/${req.params.groupId}`);
    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: "Group not found" });
        }
        if (doc.data().groupHandle !== req.user.groupHandle) {
          return res.status(403).json({ error: "Unauthorized" });
        } 
        else if (doc.data().admin !==req.user.handle){
            return res.status(402).json({ error: "Only admin can delete group" });
        }
        else {
            document.users.forEach((user) => {
                user.update({
                    groupId: null,
                    gHandle: null
                });
              });
          return document.delete();
        }
      })
      .then(() => {
        res.json({ message: "Post deleted successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  };
  

