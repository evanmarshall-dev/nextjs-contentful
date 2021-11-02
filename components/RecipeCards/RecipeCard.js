import Link from "next/link";
import Image from "next/image";
import recipeCardStyles from "./RecipeCards.module.css";

export default function RecipeCard({ recipe }) {
  // Destructure the recipe.fields from object so that we have access to the fields we want for each recipe card.
  const { title, slug, cookingTime, thumbnail } = recipe.fields;

  // In order to use next/image for external soruce we need to whitelist the domain images.ctassets.net. this is done in the next.config.js file in the root of app.
  return (
    <div className={recipeCardStyles.card}>
      <div className="featured">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className={recipeCardStyles.content}>
        <div className={recipeCardStyles.info}>
          <h4>{title}</h4>
          <p>Takes approximately {cookingTime} mins to make</p>
        </div>
        <div className={recipeCardStyles.actions}>
          <Link href={"/recipes/" + slug}>
            <a>Cook This</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
