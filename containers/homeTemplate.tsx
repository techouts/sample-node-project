import dynamic from "next/dynamic";

const componentMap: any = {
  ComponentPagesImage: dynamic(
    () => import("../components/HeroBanner/HeroBanner"),
    { ssr: true }
  ),
};

function getComponent(type: any, index: number) {
  const compName = type?.__typename;
  const Comp = componentMap[compName];
  if (Comp) {
    return <Comp {...type} key={index}></Comp>;
  }
  return <div>{compName}</div>;
}

function ComponentWrapper(props: any) {
  return (
    <div>
      {props?.data &&
        props?.data.map((typeName: object, index: number) => {
          return getComponent(typeName, index);
        })}
    </div>
  );
}

export default ComponentWrapper;
