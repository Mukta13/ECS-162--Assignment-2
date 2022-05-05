'use strict'

// for all database operations

const db = require('./sqlWrap');

module.exports = {

  update_video: update_video,
  most_recent: most_recent,
  send_video: send_video,
  total_videos:  total_videos,
  all_videos: all_videos,
  delete_video: delete_video,
  all_video_nickname: all_video_nickname,
}


const AllvideoNickname = "SELECT nickname FROM VideoTable";

const Allvideo = "SELECT * FROM VideoTable";

const videoInsert = "INSERT INTO VideoTable (url, nickname, userid, flag) values (?, ?, ?, ?)";

const mostRecent = "SELECT * FROM VideoTable WHERE flag = 1";

const VideoUpdate = "UPDATE VideoTable SET flag = 0 WHERE flag = 1";

const totalvideos = "SELECT COUNT(*) FROM VideoTable";

const deleteVideo = "DELETE FROM VideoTable WHERE nickname = ?";

async function update_video() {
  try {
    await db.run(VideoUpdate, []);
  } catch(error) {
    console.log("error", error);
  }
}

async function most_recent() {
  console.log("getting recent video async function")
  try {
    let result = await db.get(mostRecent, []);
    return result;
  } catch(error) {
    console.log("error", error);
    return {};
  }
}

async function send_video(url, nickname, username) {
  try {
    await db.run(videoInsert, [url, nickname, username, 1]);
  } catch(error) {
    console.log("error", error);
  }
}



async function total_videos() {
  try {
    let result = await db.get(totalvideos, []);
    return (result != null) ? result['COUNT(*)'] : null;
  } catch(error) {
    console.log("error", error);
    return 0;
  }
}

async function all_videos() {
  try {
    let results = await db.all(Allvideo, []);
    return results;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

async function delete_video(nickname) {
  try {
    console.log("in try delete")
    await db.run(deleteVideo,[nickname]);
  } catch(error) {
    console.log("error", error);
  }
}

async function all_video_nickname(){
  try { 
    let names = await db.all(AllvideoNickname, []);
    return names;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

