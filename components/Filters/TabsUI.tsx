import TabsComponent from "../../components/TabsComponent/TabsComponent";
import StoresAndEventsTabs from "../../components/StoresAndEvents/StoresAndEventTabs";

export default function TabsUIRenderComponent(props: any) {
  return (
    <>
      {props?.isComponentDiffer ? (
        <StoresAndEventsTabs {...props} />
      ) : (
        <TabsComponent {...props} />
      )}
    </>
  );
}
