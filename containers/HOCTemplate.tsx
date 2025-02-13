import dynamic from "next/dynamic";
import MUIInterface from "../schemas/MUISchema";

const componentMap: any = {
  Button: dynamic(() => import("../HOC/MUIButton/MUIButton"), { ssr: false }),
  headerText: dynamic(() => import("../HOC/Title/Title"), { ssr: false }),
};

function getComponent(data: MUIInterface, index: number) {
  const compName = data?.type;
  const Comp = componentMap[compName];
  if (Comp) {
    return <Comp {...data} key={index}></Comp>;
  }
  return <div>{compName}</div>;
}

function HOCTemplate(props: any) {
  return (
    <div>
      {props?.data &&
        props?.data.map((componentData: MUIInterface, index: number) => {
          return getComponent(componentData, index);
        })}
    </div>
  );
}

export default HOCTemplate;
