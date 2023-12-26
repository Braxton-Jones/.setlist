const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');
const Like = require('./Like.js');

User.hasMany(Post, {
    as: 'posts',
    foreignKey: 'userId'
})
Post.belongsTo(User, {
    as: 'author',
    foreignKey: 'userId'
})
Comment.belongsTo(Post,{ as: `parentPost`, foreignKey: `postId`})
Comment.belongsTo(User,{ as: `author`, foreignKey: `userId`})
Comment.belongsTo(Comment,{ as: `parentComment`, foreignKey: `commentId`})
Like.belongsTo(Post,{ as: `likedPost`, foreignKey: `postId`})
Like.belongsTo(Comment,{ as: `likedComment`, foreignKey: `commentId`}) 

module.exports = {
    User,
    Post,
    Comment,
    Like
}