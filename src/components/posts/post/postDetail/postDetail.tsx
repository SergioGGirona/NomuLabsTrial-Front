import { useParams } from 'react-router-dom';
import { usePosts } from '../../../../hooks/use.posts';
import { Post } from '../../../../model/post';
import styles from './postDetail.module.scss';
function PostDetail() {
  const { id } = useParams();
  const { posts } = usePosts();
  const post: Post | undefined = posts.find((post) => id === post.id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <section className={styles.postDetail}>
        <h4>{post.overview}</h4>
        <div className={styles.postDetail__author}>
          <p>{post.author.userName}</p>
          <p>{post.author.nickName}</p>
          <span>{post.likes.length} likes</span>
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
              The reference: <em>{post.referenceUrl}</em>
            </p>
          ) : (
            <p className={styles.reference}>No reference url this time!</p>
          )}
        </div>
      </section>
    </>
  );
}

export default PostDetail;
