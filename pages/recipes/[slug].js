import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RecipeDetailStyles from "../../components/RecipeDetails.module.css";

// Not inside FXN this time because it will be used in two separate FXNs on the slug.js versus index/js.
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Export in front of const
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    // Gets all recipes and stores them on a res variable
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// We just want one recipe and we get this by the prop passed into getStaticProps of context which has property of slug
export const getStaticProps = async ({ params }) => {
  // fetch single item/recipe based on page we are on
  const { items } = await client.getEntries({
    content_type: "recipe",
    // Second prop added to get singular recipe. We know slug field is unique so it will only receive one that matches params.slug.
    "fields.slug": params.slug,
  });

  return {
    // Passing in first item inside the array [0].
    props: { recipe: items[0] },
    // Revalidate is in seconds and how often nextjs can look for content updates and regenerate a page.
    revalidate: 1,
  };
};

export default function RecipeDetails({ recipe }) {
  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  // console.log(recipe);
  return (
    <div>
      <div className={RecipeDetailStyles.banner}>
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      <div className={RecipeDetailStyles.info}>
        <p>Takes about {cookingTime} mins to cook</p>
        <h3>Ingredients:</h3>

        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
    </div>
  );
}
