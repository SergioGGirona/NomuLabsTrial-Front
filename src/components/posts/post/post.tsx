import { useEffect, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { PiForkKnifeFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { usePosts } from '../../../hooks/use.posts';
import { useUsers } from '../../../hooks/use.users';
import { Post } from '../../../model/post';
import styles from './post.module.scss';
type Props = {
  post: Post;
};
export function PostRecipe({ post }: Props) {
  const { updatePost } = usePosts();
  const { userLogged, token } = useUsers();
  const [likes, setLikes] = useState(post.likes.length);
  const [hasLiked, setHasLiked] = useState(
    post.likes.includes(userLogged?.id!)
  );

  useEffect(() => {
    setLikes(post.likes.length);
    setHasLiked(post.likes.includes(userLogged?.id!));
  }, [post.likes.length, userLogged]);

  const handleLike = () => {
    if (hasLiked || !userLogged) return;
    const updatedLikes = [...post.likes, userLogged.id];
    const updatedPost: Partial<Post> = {
      likes: updatedLikes,
    };
    updatePost(updatedPost, post.id, token);
    setLikes(likes + 1);
    setHasLiked(true);
  };
  return (
    <li className={styles.post_li}>
      <div>
        <span>{post.author.userName}</span>
        <h4>{post.overview}</h4>
      </div>
      {post.images.length >= 1 ? (
        <img
          src={post.images[0].url}
          className={styles.recipeImage}
          alt="The main view of the recipe"
        />
      ) : (
        <p className={styles.noRecipeImage}>No photo but still delicious!</p>
      )}

      <span className={styles.post_li__ingredients}>
        {post.ingredients.map((ingredient, index) => (
          <p key={index}> ↪ {ingredient}</p>
        ))}
      </span>
      <div className={styles.post__buttons}>
        <div className={styles['post__button-button']}>
          <button onClick={handleLike} disabled={hasLiked}>
            <PiForkKnifeFill />
          </button>
          <span className={styles.post__buttons__likes}>
            {post.likes.length} likes
          </span>
        </div>
        <Link className={styles['post__button-link']} to={`/post/${post.id}`}>
          <MdOpenInNew />
        </Link>
      </div>
    </li>
  );
}
