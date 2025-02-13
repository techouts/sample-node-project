export interface MyOrdersFilterInterface {
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  window: any;
  filter: string;
  items: [
    { label: string; value: string; disabled: boolean; isDefault: boolean }
  ];
}
