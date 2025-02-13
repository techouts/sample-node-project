import { gql } from "@apollo/client";
import client from "../../apollo-client";
import handleErrorResponse from "../../utility/ErrorHandling";
import { toast } from "../../utility/Toast";

export const GET_CRM_CASE_BY_EMAIL_ID = gql`
  query getCRMCasesList($inputVal: String!) {
    getCRMCasesList(inputVal: $inputVal) {
      fullname
      email_id
      contactid
      mobilephone
      incident_customer_contacts {
        ticketnumber
        title
        createdon
        statecode
        statuscode
        caseorigincode
        description
        sscs_subsource
        incidentid
        sscs_Category_id
        sscs_SubCategory_id
        sscs_ordernumber
        incident_resolutions {
          subject
          activityid
        }
      }
    }
  }
`;
export const GET_CRM_CASE_BY_INCIDENT_ID = gql`
  query getCRMCaseByIncidentId($ticket_id: String!) {
    getCRMCaseByIncidentId(ticket_id: $ticket_id) {
      ticketnumber
      title
      caseorigincode
      description
      sscs_subsource
      incidentid
      sscs_Category_id
      sscs_SubCategory_id
      sscs_Order_id
      statecode
      customer_contact {
        fullname
        email_id
        contactid
        mobilephone
      }
    }
  }
`;

export const GET_CRM_CASES_BY_FILTER = gql`
  query getCRMCasesByFilter(
    $filter_type: String!
    $input_val: String!
    $filter_val: String!
    $current_page: String!
    $input_val_mobile: String!
  ) {
    getCRMCasesByFilter(
      filter_type: $filter_type
      input_val: $input_val
      filter_val: $filter_val
      current_page: $current_page
      input_val_mobile: $input_val_mobile
      page_size: "20"
    ) {
      fullname
      email_id
      contactid
      mobilephone
      total_count
      incident_customer_contacts {
        ticketnumber
        statecode
        createdon
        statuscode
        title
        caseorigincode
        description
        sscs_subsource
        incidentid
        sscs_Category_name
        sscs_Category_id
        sscs_SubCategory_name
        sscs_SubCategory_id
        sscs_ordernumber
        incident_resolutions {
          subject
          activityid
          createdon
        }
      }
    }
  }
`;

export type ServiceRequestData = {
  fullname?: string;
  email_id?: string;
  contactid?: string;
  mobilephone?: string;
  total_count: string;
  // incident_customer_contacts: ServiceListObject[];
  incident_customer_contacts: ServiceTicketDetailsType[];
};

export type ServiceListObject = {
  ticketnumber?: string;
  title?: string;
  createdon?: string;
  statecode?: string;
  statuscode?: string;
  caseorigincode?: string;
  description?: string;
  sscs_subsource?: string;
  incidentid?: string;
  sscs_Category_id?: string;
  sscs_SubCategory_id?: string;
  sscs_ordernumber?: string;
  incident_resolutions?: IncidentResolutions;
  __typename?: string;
};

export type IncidentResolutions = {
  subject?: null;
  activityid?: null;
  createdon?: null;
};

export type ServiceListApiProps = {
  type: caseFilters;
  value: string;
  filterValue: string;
  currentPage: string;
  mobile: string;
};


export async function GetServices(value: string) {
  const res = await client
    .query({
      query: GET_CRM_CASE_BY_EMAIL_ID,
      variables: {
        inputVal: value,
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
      const hasError = handleErrorResponse(response); //response checking
      if (hasError) return null;
      return response?.data;
    })
    .catch((err) => {
      const errMessage = JSON.parse(JSON.stringify(err));
      return errMessage;
    });
  return res;
}
export async function GetServiceTicketDetails(ticketnumber: string) {
  const res = await client
    .query({
      query: GET_CRM_CASE_BY_INCIDENT_ID,
      variables: {
        ticket_id: ticketnumber,
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
      const hasError = handleErrorResponse(response); //response checking
      if (hasError) return null;
      if (response?.error) {
        toast.error(
          response?.errors?.[0]?.message ??
            "Something went wrong, Please try again!"
        );
      }
      return response?.data;
    })
    .catch((err) => {
      const errMessage = JSON.parse(JSON.stringify(err));
      toast.error(
        errMessage?.message ?? "Something went wrong, Please try again!"
      );
      return errMessage;
    });
  return res;
}
//Get crm list by using filters (caseid, lastxdays, daterange))
export async function GetServiceByFilter({
  type,
  value,
  filterValue,
  currentPage,
  mobile,
}: ServiceListApiProps) {
  const res = await client
    .query({
      query: GET_CRM_CASES_BY_FILTER,
      variables: {
        filter_type: type,
        input_val: value,
        filter_val: filterValue,
        current_page: currentPage,
        input_val_mobile: mobile,
      },
      fetchPolicy: "no-cache",
    })
    .then((response) => {
      const hasError = handleErrorResponse(response); //response checking
      if (hasError) return null;
      if (response?.error) {
        toast.error(
          response?.errors?.[0]?.message ??
            "Something went wrong, Please try again!"
        );
      }
      return response?.data;
    })
    .catch((err) => {
      const errMessage = JSON.parse(JSON.stringify(err));
      toast.error(
        errMessage?.message ?? "Something went wrong, Please try again!"
      );
      return errMessage;
    });
  return res;
}

export type GetCRMCasesByFilterResponseType = {
  getCRMCasesByFilter: { itemslist: ServiceTicketDetailsType[] };
};
export type ServiceTicketDetailsType = {
  ticketnumber?: string;
  statecode?: string;
  createdon?: string;
  statuscode?: string;
  title?: string;
  caseorigincode?: string;
  description?: string;
  sscs_subsource?: string;
  incidentid?: string;
  sscs_Category_name?: string;
  sscs_Category_id?: string;
  sscs_SubCategory_name?: string;
  sscs_SubCategory_id?: string;
  sscs_ordernumber?: string;
  incident_resolutions?: IncidentResolutions;
  __typename?: string;
};

export type CustomerContact = {
  fullname?: string;
  email_id?: string;
  contactid?: string;
  mobilephone?: string;
  __typename?: string;
};

export type caseFilters = "caseid" | "lastxdays" | "daterange";

export type FilterContentType = {
  id?: number;
  keyName?: string;
  keyId?: string;
  value?: string;
};

export type AccordionContentType = {
  id?: number;
  accordionText?: string;
  dataKey?: string;
  isHidden?: boolean;
};

// export type FilterType = { id?: string; key?: string; value?: string };

export type FiltersInput = { filter_type: caseFilters; filter_val?: string };

export function getDateInYYYY_MM_DD(inputDate: Date) {
  const month =
    inputDate?.getMonth() + 1 < 10
      ? "0" + (inputDate?.getMonth() + 1)
      : inputDate?.getMonth() + 1;
  const date =
    inputDate?.getDate() < 10
      ? "0" + inputDate?.getDate()
      : inputDate?.getDate();
  return `${inputDate?.getFullYear()}-${month}-${date}`;
}

{
  /*
   * specificMonth can be 0 or any number
   * if 0, it will return current month range dates
   * if grater than 0, it will return less than current month.
   *  E.g let the current month is june (6th month) and if the specificMonth is 2 then the output range will be of april (6-2)
   */
}
function getMonthRangeData(specificMonth: number) {
  const currentDate = new Date(); //"2024-02-20T17:23:24Z"

  const firstDay = getDateInYYYY_MM_DD(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - specificMonth,
      1
    )
  );
  const lastDay = getDateInYYYY_MM_DD(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - specificMonth + 1,
      0
    )
  );
  return `${firstDay}#${lastDay}`;
}

export function getCustomDateRange(from: Date, to: Date) {
  return `${getDateInYYYY_MM_DD(from)}#${getDateInYYYY_MM_DD(to)}`;
}

export function getLastNMonthsRange(nMonths: number) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const nMonthsAgo = new Date(currentDate);
  nMonthsAgo.setMonth(nMonthsAgo.getMonth() - nMonths);
  const toDate = getDateInYYYY_MM_DD(currentDate);
  const fromDate = getDateInYYYY_MM_DD(nMonthsAgo);
  return `${fromDate}#${toDate}`;
}

export const getFilterInputs = ({
  filter,
  customDates,
}: {
  // filter?: FilterContentType;
  filter?: { keyId?: string; value?: string };
  customDates?: { from: Date; to?: Date };
}): FiltersInput => {
  switch (filter?.keyId) {
    case "currentDate": {
      const currentDate = new Date(customDates?.to ?? new Date());
      return {
        filter_type: "daterange",
        filter_val: getCustomDateRange(
          new Date(),
          new Date(currentDate.setDate(currentDate?.getDate() + 1))
        ),
      };
    }
    case "previousDate": {
      let prevDate = new Date();
      prevDate.setDate(prevDate.getDate() - Number(filter?.value || 1));
      return {
        filter_type: "daterange",
        filter_val: getCustomDateRange(prevDate, new Date()),
      };
    }
    case "lastxdays":
      return { filter_type: "lastxdays", filter_val: filter?.value };
    case "specificMonth": {
      return {
        filter_type: "daterange",
        filter_val: getMonthRangeData(Number(filter?.value)),
      };
    }
    case "monthRange": {
      return {
        filter_type: "daterange",
        filter_val: getLastNMonthsRange(Number(filter?.value)),
      };
    }
    case "customRange": {
      const toDate = new Date(customDates?.to ?? new Date());
      return {
        filter_type: "daterange",
        filter_val:
          customDates?.from && customDates?.to
            ? getCustomDateRange(
                customDates?.from ?? new Date(),
                new Date(toDate.setDate(toDate?.getDate() + 1))
              )
            : "",
      };
    }
    default:
      return {
        filter_type: "daterange",
        filter_val: getLastNMonthsRange(3),
      };
  }
};

export function getTicketStatus(code?: string) {
  if (code !== "" && code) {
    switch (Number(code)) {
      case 0: {
        return "Open";
      }
      case 1: {
        return "Resolved";
      }
      case 2: {
        return "Canceled";
      }
      default:
        return null;
    }
  }
  return null;
}
