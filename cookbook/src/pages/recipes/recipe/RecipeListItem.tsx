import BurgerPlaceHolder from "assets/burger-placeholder.jpg";
import "./styles.less";
import CategoryIndicator from "./CategoryIndicator";
import { RecipeGetDto } from "api/GET/DTOs";
import { useNavigate } from "react-router-dom";
import TagSet from "components/tag-set/TagSet";

interface RecipeListItemProps {
  readonly recipe: RecipeGetDto;
}

const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  const navigate = useNavigate();

  return (
    <article
      className="recipe-list-item block floating interactive-element"
      onClick={() => navigate(`./${recipe.id}`, { relative: "path" })}>
      <img src={recipe.imageSrc ?? BurgerPlaceHolder} />
      <h2>{recipe.name}</h2>
      <TagSet tags={recipe.tags} tagSize="small" disableShadow align="start" />
      <CategoryIndicator category={recipe.category} />
    </article>
  );
};

export default RecipeListItem;
