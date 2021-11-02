import { createClient } from "contentful";

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
  };
};

export default function RecipeDetails({ recipe }) {
  // console.log(recipe);
  return <div>Recipe Details</div>;
}
