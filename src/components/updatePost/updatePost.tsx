import { SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import { Post } from '../../model/post';
import styles from '../postForm/postForm.module.scss';
function UpdatePost() {
  const { posts, updatePost } = usePosts();
  const navigate = useNavigate();
  const { token } = useUsers();
  const { id } = useParams();
  const post = posts.find((post) => id === post.id);

  if (!post || !id) return;
  const [ingredients, setIngredients] = useState<string[]>(post.ingredients);

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;
    const postData: Partial<Post> = {
      overview:
        (formElement.elements.namedItem('overview') as HTMLFormElement).value ||
        post.overview,
      aproxTime: parseInt(
        (formElement.elements.namedItem('aproxTime') as HTMLFormElement).value
      ),
      referenceUrl:
        (formElement.elements.namedItem('referenceUrl') as HTMLFormElement)
          .value || post.referenceUrl,
      ingredients: ingredients,

      steps: {
        arrange:
          (formElement.elements.namedItem('steps-arrange') as HTMLFormElement)
            .value || post.steps.arrange,
        boarding:
          (formElement.elements.namedItem('steps-boarding') as HTMLFormElement)
            .value || post.steps.boarding,
        complete:
          (formElement.elements.namedItem('steps-complete') as HTMLFormElement)
            .value || post.steps.complete,
      },
    };
    updatePost(postData, id, token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form__post}>
      <hgroup>
        <h3>A new pirate recipe?</h3>
        <p>Let's see that!</p>
      </hgroup>
      <div className={styles.form__post__text}>
        <label htmlFor="overview">Sum it up in one sentence</label>
        <input
          type="text"
          id="overview"
          name="overview"
          placeholder={post.overview}
        />
      </div>
      <div className={styles.form__post__text}>
        <label htmlFor="referenceUrl">Do you have a reference url?</label>
        <input
          type="text"
          id="referenceUrl"
          name="referenceUrl"
          placeholder={post.referenceUrl}
        />
      </div>
      <div className={styles.form__post__text}>
        <label htmlFor="aproxTime">How long does it take?</label>
        <div>
          <input
            className={styles['form__post__text-input']}
            type="number"
            id="aproxTime"
            name="aproxTime"
            placeholder={post.aproxTime ? post.aproxTime.toString() : ''}
          />
          minutes
        </div>
      </div>
      <div className={styles.form__post__text}>
        <label htmlFor="ingredients">Ingredients:</label>
        <span>Separate them by a comma</span>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={ingredients.join(', ')}
          placeholder={post.ingredients.join(', ')}
          onChange={(e) => setIngredients(e.target.value.split(', '))}
        />
      </div>
      <fieldset>
        <legend>Let's make it!</legend>
        <div className={styles.form__post__text}>
          <label htmlFor="steps-arrange">Arrange:</label>
          <textarea
            name="steps-arrange"
            id="steps-arrange"
            placeholder={post.steps.arrange}
            defaultValue={post.steps.arrange}
          />
        </div>

        <div className={styles.form__post__text}>
          <label htmlFor="steps-boarding">Boarding:</label>
          <textarea
            name="steps-boarding"
            id="steps-boarding"
            placeholder={post.steps.boarding}
            defaultValue={post.steps.boarding}
          />
        </div>

        <div className={styles.form__post__text}>
          <label htmlFor="steps-complete">Complete:</label>
          <textarea
            name="steps-complete"
            placeholder={post.steps.complete}
            id="steps-complete"
            defaultValue={post.steps.complete}
          />
        </div>
      </fieldset>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdatePost;
