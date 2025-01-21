import "./styles.less";
import api from "api/api";
import { RecipeCreateDto } from "api/POST/DTOs";
import { useAlerts } from "components/alert/AlertStack";
import RecipeCreationForm, {
  EmptyRecipeCreationFormValues,
  RecipeData,
} from "components/recipe-creation-form/RecipeCreationForm";
import store from "storage/redux/store";
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import storeActions from "storage/redux/actions";
import { useEffect, useRef, useState } from "react";

export async function loader(): Promise<null> {
  await store.dispatch(storeActions.categories.async.fetchCategories()).unwrap();
  await store.dispatch(storeActions.tags.async.fetchTags()).unwrap();
  return null;
}

const pendingChangesLocalStorageKey = "pendingCreate";

const RecipeCreationPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const tags = useAppSelector(state => state.tags.tags);

  const { displayMessage } = useAlerts();

  const [initialFormData, setInitialFormData] = useState<RecipeData>();
  const [pendingChangesLoaded, setPendingChangesLoaded] = useState<boolean>(false);
  const firstRender = useRef<boolean>(true);

  const onSubmitCallback = async (dto: RecipeCreateDto): Promise<void> => {
    const newRecipe = await api.post.createRecipe(dto);
    dispatch(storeActions.recipes.setRecipeInCache(newRecipe));
    displayMessage({ type: "success", message: "Przepis został utworzony.", fadeOutAfter: 5000 });
  };

  useEffect(() => {
    // This logic must be run only once.
    if (firstRender.current === false) {
      return;
    }
    firstRender.current = false;

    setInitialFormData(EmptyRecipeCreationFormValues);
  }, []);

  return (
    <div className="page recipe-creation-page">
      <h1>Nowy przepis</h1>
      {initialFormData && (
        <RecipeCreationForm
          categories={categories}
          tags={tags}
          onSuccessNavigateTo="/recipes"
          onSubmitCallback={onSubmitCallback}
          initialValues={initialFormData}
          pendingChangesLocalStorageKey={pendingChangesLocalStorageKey}
          initiallyDirty={pendingChangesLoaded}
        />
      )}
    </div>
  );
};

export default RecipeCreationPage;
