import { Comment } from '../../../DB/Models/comment.model.js';
import { User } from '../../../DB/Models/user.model.js';
import { Post } from '../../../DB/Models/post.model.js';
import { Op } from 'sequelize';
//1
export const createComments = async (req, res) => {
  try {
    const comments = req.body; 
    const created = await Comment.bulkCreate(comments);
    res.status(201).json({
      message: 'Comments created successfully',
      comments: created
    });

  }catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//2
export const updateCommentContent = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this comment' });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json({ message: 'Comment updated successfully', comment });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//3
export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content }
    });
    res.status(200).json({
      comment,
      created
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//4
export const searchCommentsByWord = async (req, res) => {
  try {
    const { word } = req.query;
    if (!word) {
      return res.status(400).json({ message: 'Query param "word" is required.' });
    }
    const result = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`
        }
      }
    });
    if (result.count === 0) {
      return res.status(404).json({ message: 'no comments found.' });
    }
    res.status(200).json({
      count: result.count,
      comments: result.rows
    });
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//5
export const getRecentCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { postId },
      order: [['created_at', 'DESC']],
      limit: 3
    });
    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//6
export const getCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'UserData',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Post,
          as: 'PostData',
          attributes: ['id', 'title', 'content'],
           paranoid: false
        }
      ]
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
