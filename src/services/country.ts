import { API_URL, ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/utils";
import { CommonResponse } from "@/types/response/common";
import { Country } from "@/types/response/country";
import { queryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const getCountries = () => {
  const endpoint = ENDPOINTS.COUNTRY.DEFAULT;

  return queryOptions<
    AxiosResponse<CommonResponse<Country[]>>,
    AxiosResponse,
    CommonResponse<Country[]>
  >({
    queryKey: [endpoint],
    queryFn: () => {
      console.log(API_URL);
      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("perPage", "1000");

      return API.get(endpoint, { params });
    },
    select: (data) => data.data,
  });
};
