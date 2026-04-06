import BookmarkRepositories from '../repositories/bookmark-repositories.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
/* eslint-disable camelcase */

export const createBookmark = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { id: user_id } = req.user;
    const bookmark = await BookmarkRepositories.createBookmark({ user_id, job_id: jobId });

    return response(res, 201, 'Bookmark berhasil ditambahkan', { id: bookmark });

  } catch (error) {
    next(error);
  }
};

export const getBookmarks = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const bookmarks = await BookmarkRepositories.getBookmarks(user_id);

    return response(res, 200, 'Berhasil mendapatkan bookmark', { bookmarks });

  } catch (error) {
    next(error);
  }
};

export const getBookmarkById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookmark = await BookmarkRepositories.getBookmarkById(id);

    if (!bookmark) {
      throw new NotFoundError('Bookmark tidak ditemukan');
    }

    return response(res, 200, 'Berhasil mendapatkan bookmark', bookmark);

  } catch (error) {
    next(error);
  }
};

export const deleteBookmark = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { id: user_id } = req.user;
    const deletedBookmark = await BookmarkRepositories.deleteBookmark(user_id, jobId);

    if (!deletedBookmark) {
      throw new NotFoundError('Bookmark tidak ditemukan');
    }

    return response(res, 200, 'Bookmark berhasil dihapus');

  } catch (error) {
    next(error);
  }
};