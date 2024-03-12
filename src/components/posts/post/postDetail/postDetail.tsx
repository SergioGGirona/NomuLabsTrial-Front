import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useComments } from '../../../../hooks/use.comments.js';
import { usePosts } from '../../../../hooks/use.posts.js';
import { useUsers } from '../../../../hooks/use.users.js';
import { Post } from '../../../../model/post.js';
import styles from './postDetail.module.scss';
function PostDetail() {
  const { id } = useParams();
  const { posts } = usePosts();
  const { userLogged } = useUsers();
  const { addComment, loadComments, comments } = useComments();
  const post: Post | undefined = posts.find((post) => id === post.id);
  if (!post) {
    return <div>Post not found</div>;
  }
  useEffect(() => {
    loadComments(post.id);
  }, [loadComments]);

  const [commentContent, setcommentContent] = useState('');

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (!userLogged) return;
    const newComment = {
      content: commentContent,
      owner: userLogged,
    };
    addComment(newComment, post.id);
  };

  return (
    <div className={styles.postDetailPage}>
      <section className={styles.postDetail}>
        <h4>{post.overview}</h4>
        <div className={styles.postDetail__author}>
          <p>{post.author.userName}</p>
          <p>{post.author.nickName}</p>
          <span>{post.likes.length} likes</span>
          <span>{post.aproxTime} minutes</span>
        </div>
        <div className={styles.recipe}>
          <ul className={styles.recipe__field}>
            {post.ingredients.map((ingredient, index) => {
              return <li key={index}> - {ingredient}</li>;
            })}
          </ul>
          <fieldset className={styles.recipe__field}>
            <legend>1. Arrange</legend>
            <p>{post.steps.arrange}</p>
          </fieldset>
          <fieldset className={styles.recipe__field}>
            <legend>2. Boarding</legend>
            <p>{post.steps.boarding}</p>
          </fieldset>
          <fieldset className={styles.recipe__field}>
            <legend>3. Complete</legend>
            <p>{post.steps.complete}</p>
          </fieldset>
          {post.referenceUrl ? (
            <p className={styles.reference}>
              The reference:
              <a
                href={
                  post.referenceUrl.startsWith('http')
                    ? post.referenceUrl
                    : `http://${post.referenceUrl}`
                }
                target="_blank"
              >
                {post.referenceUrl}
              </a>
            </p>
          ) : (
            <p className={styles.reference}>No reference url this time!</p>
          )}
        </div>
      </section>
      <section className={styles.comments}>
        <form className={styles.comments__create} onSubmit={handleSubmit}>
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={3}
            placeholder="Wanna comment this recipe?"
            value={commentContent}
            maxLength={200}
            onChange={(e) => setcommentContent(e.target.value)}
          ></textarea>
          <button type="submit">Comment</button>
        </form>
        <div className={styles.comments__show}>
          {comments.length > 0 && (
            <ul>
              {comments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <div className={styles['comment_owner-info']}>
                      <h6>{comment.owner.userName}</h6>
                      <span>{comment.createdAt.toString().slice(0, 10)}</span>
                    </div>
                    <p>{comment.content}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
