import { MultiTabs } from "../../../HOC/MultiTabs/MultiTabs";
import { useMobileCheck } from "../../../utility/isMobile";
import CartCarousel from "../CarouselTabs/CartCarousel";
import {
  SuggestionsHeader,
  SuggestionTitle,
  ViewAllText,
} from "./CartSuggestionsStyles";

export function CartSuggestions({ data, updateCartSuggestions }: any) {
  const isMobile = useMobileCheck();
  return (
    <>
      {isMobile ? (
        <>
          {data?.map((data: any) => {
            return (
              <CartSuggestionsMsite
                products={data?.tabData?.componentData}
                title={data?.tabTitle}
                showViewAll={data?.tabData?.showViewAll}
                navigationUrl={data?.tabData?.navigationUrl}
                updateCartSuggestions={updateCartSuggestions}
              />
            );
          })}
        </>
      ) : (
        <MultiTabs data={data} updateCartSuggestions={updateCartSuggestions} />
      )}
    </>
  );
}

const CartSuggestionsMsite = ({ products, title, showViewAll, navigationUrl, updateCartSuggestions }: any) => {
  const isMobile = useMobileCheck();
  return (
    <>
      <SuggestionsHeader>
        <SuggestionTitle>{title}</SuggestionTitle>
        {showViewAll && (
          <ViewAllText $isMobile={isMobile} onClick = {() => window.location.assign(`${window.location.origin}${navigationUrl}`)}>{"View all"}</ViewAllText>
        )}
      </SuggestionsHeader>
      <CartCarousel products={products} updateCartSuggestions={updateCartSuggestions}/>
    </>
  );
};
