// Connect to Contenful using FXN from the installed contenful npm package.
import { createClient } from "contentful";
// Import component which contains the layout of each card to cut down on code for index.js
import RecipeCard from "../components/RecipeCards/RecipeCard";
import recipeCardStyles from "../components/RecipeCards/RecipeCards.module.css";

// GetStaticProps FXN: Grab data and use data to inject props into our components.
export async function getStaticProps() {
  // Store results in variable called client.
  // The below createClient FXN establishes connection to contenful and then the client variable can then be used in a method to grab data.
  // We need to pass in some configs to createClient, which take an object with space and account properties. You get these from contenful api settings.
  // NOTE: Better to use environment variables so that the space and account info isn't accessible. These are stored in the root of project under .env.local. Then NextJS stores the environmental variables in a process.env. After adding .env variables you need to restart next dev server.
  // Now we are connected to contentful using client variable which we will use to grab data from it.
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  // FXN client.getEntries is used to get items from contentful space (i.e. recipes).
  // We need to specify which space by passing in an options object with property content_type. The ID of recipe below is content_type_id found in content model of contentful.
  // Once we have the content_type they are stored on a items property inside res object.
  const res = await client.getEntries({ content_type: "recipe" });

  // Any item passed to the props can be then pushed to the Recipes component of the page.
  return {
    props: {
      // res.items is all of the items we get back from the above getEntries FXN.
      recipes: res.items,
    },
    revalidate: 1,
  };
}

// Now we can pass in the recipes prop into this component.
export default function Recipes({ recipes }) {
  // Below console log should provide object for each recipe containing sys and fields properties.
  // console.log(recipes);

  return (
    <div className={recipeCardStyles.recipeList}>
      {/* Map through recipes prop for recipe and output to div the recipe "fields" title from the object array and the key is the id of the object found in "sys" property of the object. */}
      {/* The recipe={recipe} allows us to import into the RecipeCard component. */}
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  );
}
