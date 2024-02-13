import { SyntheticEvent, useState } from 'react';
import { usePosts } from '../../hooks/use.posts';
import styles from './postForm.module.scss';
function NewPostForm() {
  const { addPost } = usePosts();
  const [overview, setOverview] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [steps, setSteps] = useState({
    arrange: '',
    boarding: '',
    complete: '',
  });

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('overview', overview);
    formData.append('referenceUrl', referenceUrl);
    formData.append('arrange', steps.arrange);
    formData.append('boarding', steps.boarding);
    formData.append('complete', steps.complete);
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });

    addPost(formData);

    setOverview('');
    setIngredients([]);
    setReferenceUrl('');
    setSteps({
      arrange: '',
      boarding: '',
      complete: '',
    });
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
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>
      <div className={styles.form__post__text}>
        <label htmlFor="referenceUrl">Do you have a reference url?</label>
        <input
          type="text"
          id="referenceUrl"
          value={referenceUrl}
          onChange={(e) => setReferenceUrl(e.target.value)}
        />
      </div>
      <div className={styles.form__post__text}>
        <label htmlFor="ingredients">Ingredients:</label>
        <span>Separate them by a comma</span>
        <input
          type="text"
          id="ingredients"
          value={ingredients.join(', ')}
          onChange={(e) => setIngredients(e.target.value.split(', '))}
        />
      </div>

      <fieldset>
        <legend>Let's make it!</legend>
        <div className={styles.form__post__text}>
          <label htmlFor="steps-arrange">Arrange:</label>
          <textarea
            id="steps-arrange"
            value={steps.arrange}
            onChange={(e) => setSteps({ ...steps, arrange: e.target.value })}
          />
        </div>

        <div className={styles.form__post__text}>
          <label htmlFor="steps-boarding">Boarding:</label>
          <textarea
            id="steps-boarding"
            value={steps.boarding}
            onChange={(e) => setSteps({ ...steps, boarding: e.target.value })}
          />
        </div>

        <div className={styles.form__post__text}>
          <label htmlFor="steps-complete">Complete:</label>
          <textarea
            id="steps-complete"
            value={steps.complete}
            onChange={(e) => setSteps({ ...steps, complete: e.target.value })}
          />
        </div>
      </fieldset>

      <button type="submit">Publish</button>
    </form>
  );
}

export default NewPostForm;
