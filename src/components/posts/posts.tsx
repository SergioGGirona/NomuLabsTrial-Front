import { useEffect } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { PostRecipe } from './post/post';
import styles from './posts.module.scss';

export function Posts() {
  const { posts, loadPosts, postStatus } = usePosts();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <>
      <h2>Pirate recipes you follow</h2>
      <section className={styles.users__posts}>
        {postStatus === 'loaded' && (
          <ul className={styles.wolvesList}>
            {posts.map((item) => (
              <PostRecipe key={item.id} post={item}></PostRecipe>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
