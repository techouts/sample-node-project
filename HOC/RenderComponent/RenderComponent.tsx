import AllComponents from "../../utility/ComponentMappingUtility";
import { useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { isMobile as deviceIsMobile } from 'react-device-detect';

export function LazyloadComponents({ Component,
  data,
  position,
}:any) {
  const ref = useRef();

  const { ref: inViewRef, inView, entry } = useInView({ triggerOnce: true, threshold: 0.2, rootMargin: "10px" });

  const _inView = entry ? inView : true

  // Use `useCallback` so we don't recreate the function on each render
  const setRefs = useCallback(
    node => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );
  const isMobile = deviceIsMobile;
  const ComponentRender = AllComponents[Component];

  const componentData = { ...data, position: position };

  if (data.display === (isMobile ? "mobile" : "web") || data.display == null) {
    return ComponentRender ? (
      <div ref={setRefs}>
        {_inView ? <ComponentRender  {...componentData} /> : null}
      </div>
    ) : null;
  
  }
}

const RenderComponent = ({
  Component,
  data,
  position,
  show = false,
  isFromOptimization = false,
}: any) => {
  const isMobile = deviceIsMobile;
  const ComponentRender = AllComponents[Component];
  if (show) {
    return isFromOptimization && ComponentRender ? (
      <ComponentRender {...data} />
    ) : (
      <Component {...data} />
    );
  }
  const componentData = { ...data, position: position };
  if (data.display == null) {
    return isFromOptimization && ComponentRender ? (
      <ComponentRender {...componentData} />
    ) : (
      <Component {...componentData} />
    );
  } else {
    return isMobile ? (
      data.display === "mobile" ? (
        isFromOptimization && ComponentRender ? (
          <ComponentRender {...componentData} />
        ) : (
          <Component {...componentData} />
        )
      ) : (
        <></>
      )
    ) : data.display === "web" ? (
      isFromOptimization && ComponentRender ? (
        <ComponentRender {...componentData} />
      ) : (
        <Component {...componentData} />
      )
    ) : (
      <></>
    );
  }
};
export default RenderComponent;
